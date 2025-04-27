import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersHandler } from './get-user.handler';
import { GetUsersUseCase } from 'domain/usecase';
import { User } from 'domain/model';

describe('GetUsersHandler', () => {
  let handler: GetUsersHandler;
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(async () => {
    const mockGetUsersUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersHandler,
        {
          provide: 'GetUsersUseCase',
          useValue: mockGetUsersUseCase,
        },
      ],
    }).compile();

    handler = module.get<GetUsersHandler>(GetUsersHandler);
    getUsersUseCase = module.get<GetUsersUseCase>('GetUsersUseCase');
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('execute should call getUsersUseCase.apply and return users', async () => {
    const users: User[] = [
      {
        id: '1',
        name: 'User One',
        email: 'userone@example.com',
        createdAt: new Date(),
        order: [],
      } as User,
      {
        id: '2',
        name: 'User Two',
        email: 'usertwo@example.com',
        createdAt: new Date(),
        order: [],
      } as User,
    ];
    (getUsersUseCase.apply as jest.Mock).mockResolvedValue(users);

    const result = await handler.execute();

    expect(getUsersUseCase.apply).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
