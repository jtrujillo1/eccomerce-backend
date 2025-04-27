import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'domain/interface/repositories/user.repository.interface';
import { CreateUser, User } from 'domain/model';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new Error('Error in get user', error as Error);
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error in get user', error as Error);
    }
  }

  async find(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new Error(`Error in get users`, error as Error);
    }
  }

  async save(createUser: CreateUser): Promise<User> {
    try {
      return this.userRepository.save(createUser);
    } catch (error) {
      throw new Error('Error in save user', error as Error);
    }
  }
}
