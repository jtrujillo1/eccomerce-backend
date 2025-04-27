import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../entities';
import { CreateUser } from 'domain/model';

describe('UserRepository', () => {
  let repository: UserRepository;
  let typeOrmRepository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    typeOrmRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should find user by email', async () => {
    const user = { email: 'test@example.com' } as UserEntity;
    typeOrmRepository.findOne.mockResolvedValue(user);

    const result = await repository.findByEmail('test@example.com');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(result).toEqual(user);
  });

  it('should throw error on findByEmail method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(new Error('Error in get user'));

    await expect(repository.findByEmail('test@example.com')).rejects.toThrow(
      'Error in get user',
    );
  });

  it('should find user by id', async () => {
    const user = { id: 'user1' } as UserEntity;
    typeOrmRepository.findOne.mockResolvedValue(user);

    const result = await repository.findOne('user1');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'user1' },
    });
    expect(result).toEqual(user);
  });

  it('should throw error on findOne method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(new Error('Error in get user'));

    await expect(repository.findOne('user1')).rejects.toThrow(
      'Error in get user',
    );
  });

  it('should find all users', async () => {
    const users = [{ id: 'user1' } as UserEntity] as UserEntity[];
    typeOrmRepository.find.mockResolvedValue(users);

    const result = await repository.find();

    expect(typeOrmRepository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should throw error on find method error', async () => {
    typeOrmRepository.find.mockRejectedValue(new Error('Error in get users'));

    await expect(repository.find()).rejects.toThrow('Error in get users');
  });

  it('should save a new user', async () => {
    const createUser = { id: 'user1' } as UserEntity;
    const savedUser = { id: 'user1' } as UserEntity;

    typeOrmRepository.save.mockResolvedValue(savedUser);

    const result = await repository.save(createUser);

    expect(typeOrmRepository.save).toHaveBeenCalledWith(createUser);
    expect(result).toEqual(savedUser);
  });

  it('should throw error on save method error', async () => {
    typeOrmRepository.save.mockRejectedValue(new Error('Error in save user'));

    await expect(repository.save({} as CreateUser)).rejects.toThrow(
      'Error in save user',
    );
  });
});
