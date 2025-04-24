import { ILogger } from 'domain/interface';
import { IUserRepository } from 'domain/interface/repositories/user.repository.interface';

export class GetUsersUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async apply() {
    this.logger.log('Get all users', GetUsersUseCase.name);
    return await this.userRepository.find();
  }
}
