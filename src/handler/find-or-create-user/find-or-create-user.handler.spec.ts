import { Test, TestingModule } from '@nestjs/testing';
import { FindOrCreateUserHandler } from './find-or-create-user.handler';
import { FindOrCreateUserUseCase } from 'domain/usecase';
import { GetUserByEmailDto } from 'src/model/dto';

describe('FindOrCreateUserHandler', () => {
  let handler: FindOrCreateUserHandler;
  let findOrCreateUserUseCase: FindOrCreateUserUseCase;

  beforeEach(async () => {
    const mockFindOrCreateUserUseCase = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOrCreateUserHandler,
        {
          provide: 'FindOrCreateUserUseCase',
          useValue: mockFindOrCreateUserUseCase,
        },
      ],
    }).compile();

    handler = module.get<FindOrCreateUserHandler>(FindOrCreateUserHandler);
    findOrCreateUserUseCase = module.get<FindOrCreateUserUseCase>(
      'FindOrCreateUserUseCase',
    );
  });

  it('should be defined', (): void => {
    expect(handler).toBeDefined();
  });

  it('execute should call findOrCreateUserUseCase.apply and return result', async (): Promise<void> => {
    const createUser: GetUserByEmailDto = {
      // fill with required properties as per DTO
    } as GetUserByEmailDto;

    const useCaseResponse = {
      id: 'user-id',
      status: 1,
    };

    (findOrCreateUserUseCase.apply as jest.Mock).mockResolvedValue(
      useCaseResponse,
    );

    const result = await handler.execute(createUser);

    expect(findOrCreateUserUseCase.apply).toHaveBeenCalledWith(createUser);
    expect(result).toEqual(useCaseResponse);
  });
});
