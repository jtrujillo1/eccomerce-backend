import { User } from 'domain/model';

export interface IUserRepository {
  find(): Promise<User[]>;
}
