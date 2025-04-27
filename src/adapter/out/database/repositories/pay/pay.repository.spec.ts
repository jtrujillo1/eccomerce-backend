import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayRepository } from './pay.repository';
import { PayEntity } from '../../entities';
import { CreatePay } from 'domain/model';

describe('PayRepository', () => {
  let repository: PayRepository;
  let typeOrmRepository: jest.Mocked<Repository<PayEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayRepository,
        {
          provide: getRepositoryToken(PayEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<PayRepository>(PayRepository);
    typeOrmRepository = module.get(getRepositoryToken(PayEntity));
  });

  it('should get transaction by reference', async () => {
    const transaction = { reference: 'ref123' } as PayEntity;
    typeOrmRepository.findOne.mockResolvedValue(transaction);

    const result = await repository.getTransactionByReference('ref123');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { reference: 'ref123' },
      relations: ['order', 'order.user'],
    });
    expect(result).toEqual(transaction);
  });

  it('should throw error if transaction by reference not found', async () => {
    typeOrmRepository.findOne.mockResolvedValue(null);

    await expect(
      repository.getTransactionByReference('ref123'),
    ).rejects.toThrow('Error in get transaction');
  });

  it('should get transaction by id', async () => {
    const transaction = { id: 'tx123' } as PayEntity;
    typeOrmRepository.findOne.mockResolvedValue(transaction);

    const result = await repository.getTransaction('tx123');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'tx123' },
      relations: ['order'],
    });
    expect(result).toEqual(transaction);
  });

  it('should throw error if transaction by id not found', async () => {
    typeOrmRepository.findOne.mockResolvedValue(null);

    await expect(repository.getTransaction('tx123')).rejects.toThrow(
      'Error in get transaction',
    );
  });

  it('should save a new transaction', async () => {
    const createPay = { id: 'tx123' } as PayEntity;
    const savedTransaction = { id: 'tx123' } as PayEntity;

    typeOrmRepository.save.mockResolvedValue(savedTransaction);

    const result = await repository.save(createPay);

    expect(typeOrmRepository.save).toHaveBeenCalledWith(createPay);
    expect(result).toEqual(savedTransaction);
  });

  it('should throw error on getTransactionByReference method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(new Error('DB error'));

    await expect(
      repository.getTransactionByReference('ref123'),
    ).rejects.toThrow('Error in get transaction');
  });

  it('should throw error on getTransaction method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(new Error('DB error'));

    await expect(repository.getTransaction('tx123')).rejects.toThrow(
      'Error in get transaction',
    );
  });

  it('should throw error on save method error', async () => {
    typeOrmRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(repository.save({} as CreatePay)).rejects.toThrow(
      'Error in save transaction',
    );
  });
});
