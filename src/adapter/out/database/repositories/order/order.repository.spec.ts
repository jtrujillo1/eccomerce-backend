import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from './order.repository';
import { OrderEntity } from '../../entities';
import { CreateOrder } from 'domain/model';

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let typeOrmRepository: jest.Mocked<Repository<OrderEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<OrderRepository>(OrderRepository);
    typeOrmRepository = module.get(getRepositoryToken(OrderEntity));
  });

  it('should find an order by id', async () => {
    const order: OrderEntity = { id: 'order1' } as OrderEntity;
    typeOrmRepository.findOne.mockResolvedValue(order);

    const result = await repository.find('order1');

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'order1' },
      relations: ['transaction'],
    });
    expect(result).toEqual(order);
  });

  it('should throw error if order not found', async () => {
    typeOrmRepository.findOne.mockResolvedValue(null);

    await expect(repository.find('order1')).rejects.toThrow(
      'Error in get order',
    );
  });

  it('should save a new order with status PENDING', async () => {
    const createOrderDto = {
      amountInCents: 4522,
      status: 'PENDING',
    } as CreateOrder;
    const savedOrder = { id: 'order1', status: 'PENDING' } as OrderEntity;

    typeOrmRepository.save.mockResolvedValue(savedOrder);

    const result = await repository.save(createOrderDto);

    expect(typeOrmRepository.save).toHaveBeenCalledWith({
      ...createOrderDto,
      status: 'PENDING',
    });
    expect(result).toEqual(savedOrder);
  });

  it('should throw error on find method error', async () => {
    typeOrmRepository.findOne.mockRejectedValue(new Error('DB error'));

    await expect(repository.find('order1')).rejects.toThrow(
      'Error in get order',
    );
  });

  it('should throw error on save method error', async () => {
    typeOrmRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(repository.save({} as CreateOrder)).rejects.toThrow(
      'Error in save order',
    );
  });
});
