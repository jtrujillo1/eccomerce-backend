import { IUserRepository, ILogger } from 'domain/interface';
import { GetUserByEmail, User } from 'domain/model';
import { FindOrCreateUserUseCase } from './find-or-create-user.usecase';

describe('FindOrCreateUserUseCase', () => {
  let useCase: FindOrCreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    userRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new FindOrCreateUserUseCase(userRepository, logger);
  });

  it('should find existing user', async () => {
    const userId = 'user-1';
    const user: User = { id: userId } as User;

    userRepository.findByEmail.mockResolvedValue(user);

    const result = await useCase.apply({ email: 'dummy' } as GetUserByEmail);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('dummy');
    expect(result).toEqual({ id: 'user-1', status: 200 });
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should create user if not found', async () => {
    const userId = 'user-1';
    const newUser: User = { id: userId } as User;

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockResolvedValue(newUser);

    const result = await useCase.apply({ email: 'dummy' } as GetUserByEmail);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('dummy');
    expect(userRepository.save).toHaveBeenCalledWith({ email: 'dummy' });
    expect(result).toEqual({ id: 'user-1', status: 200 });
  });
});
