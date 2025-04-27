import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { FindOrCreateUserHandler, GetUsersHandler } from 'src/handler';
import { GetUserByEmailDto } from 'src/model/dto';
import { User } from 'domain/model';

describe('UserController', () => {
  let controller: UserController;
  let getUserHandler: GetUsersHandler;
  let findOrCreateUserHandler: FindOrCreateUserHandler;

  const handlerMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: GetUsersHandler,
          useValue: handlerMock,
        },
        {
          provide: FindOrCreateUserHandler,
          useValue: handlerMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    getUserHandler = module.get<GetUsersHandler>(GetUsersHandler);
    findOrCreateUserHandler = module.get<FindOrCreateUserHandler>(
      FindOrCreateUserHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', email: 'test@example.com', createdAt: new Date() } as User,
      ];

      jest.spyOn(getUserHandler, 'execute').mockResolvedValue(users);

      expect(await controller.getAllUsers()).toBe(users);
    });
  });

  describe('createUser', () => {
    it('should return a user id and status', async () => {
      const dto: GetUserByEmailDto = { email: 'test@example.com' };
      const response = { id: '1', status: 201 };

      jest
        .spyOn(findOrCreateUserHandler, 'execute')
        .mockResolvedValue(response);

      const result = await controller.createUser(dto);
      expect(result).toEqual(response);
    });
  });
});
