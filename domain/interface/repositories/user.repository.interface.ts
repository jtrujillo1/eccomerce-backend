import { CreateUser, User } from 'domain/model';

export interface IUserRepository {
  find(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(createUser: CreateUser): Promise<User>;
}
