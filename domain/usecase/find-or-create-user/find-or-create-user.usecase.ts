import { ILogger } from 'domain/interface';
import { IUserRepository } from 'domain/interface/repositories/user.repository.interface';
import { GetUserByEmail } from 'domain/model';

export class FindOrCreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(
    getUserByEmail: GetUserByEmail,
  ): Promise<{ id: string; status: number }> {
    const { email } = getUserByEmail;
    this.logger.log(
      `Get users with email ${email}`,
      FindOrCreateUserUseCase.name,
    );
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return { id: user.id, status: 200 };
    } else {
      this.logger.log(`User with email ${email} no exists`);
    }

    this.logger.log(`Saving user with email ${email}`);

    const createUser = {
      email,
    };

    const newUser = await this.userRepository.save(createUser);

    return { id: newUser.id, status: 200 };
  }
}
