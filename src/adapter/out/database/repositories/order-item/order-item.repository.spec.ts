import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemEntity } from '../../entities';
import { CreateOrderItem } from 'domain/model';

describe('OrderItemRepository', () => {
  let repository: OrderItemRepository;
  let typeOrmRepository: jest.Mocked<Repository<OrderItemEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemRepository,
        {
          provide: getRepositoryToken(OrderItemEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<OrderItemRepository>(OrderItemRepository);
    typeOrmRepository = module.get(getRepositoryToken(OrderItemEntity));
  });

  it('should save a new order item', async () => {
    const createOrderItem = { quantity: 2 } as CreateOrderItem;
    const savedOrderItem = { id: 'item1' } as OrderItemEntity;

    typeOrmRepository.save.mockResolvedValue(savedOrderItem);

    const result = await repository.save(createOrderItem);

    expect(typeOrmRepository.save).toHaveBeenCalledWith(createOrderItem);
    expect(result).toEqual(savedOrderItem);
  });

  it('should throw error on save method error', async () => {
    typeOrmRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(repository.save({} as CreateOrderItem)).rejects.toThrow(
      'Error in save transaction',
    );
  });
});
