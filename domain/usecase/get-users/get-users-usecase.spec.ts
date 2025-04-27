import { GetUsersUseCase } from './get-users.usecase';
import { IUserRepository } from 'domain/interface/repositories/user.repository.interface';
import { ILogger } from 'domain/interface';
import { User } from 'domain/model';

describe('GetUsersUseCase', () => {
  let useCase: GetUsersUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    userRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new GetUsersUseCase(userRepository, logger);
  });

  it('should log and return all users', async () => {
    const users: User[] = [{ id: 'user-1' } as User, { id: 'user-2' } as User];

    userRepository.find.mockResolvedValue(users);

    const result = await useCase.apply();

    expect(logger.log).toHaveBeenCalledWith('Get all users', 'GetUsersUseCase');
    expect(userRepository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
