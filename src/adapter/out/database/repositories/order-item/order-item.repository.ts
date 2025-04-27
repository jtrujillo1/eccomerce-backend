import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderItem, OrderItem } from 'domain/model';
import { Repository } from 'typeorm';
import { IOrderItemRepository } from 'domain/interface';
import { OrderItemEntity } from '../../entities';

@Injectable()
export class OrderItemRepository implements IOrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async save(createOrderItem: CreateOrderItem): Promise<OrderItem> {
    try {
      return await this.orderItemRepository.save(createOrderItem);
    } catch (error) {
      throw new Error(`Error in save transaction`, error as Error);
    }
  }
}
