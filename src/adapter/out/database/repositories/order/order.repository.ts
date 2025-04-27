import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrder, Order } from 'domain/model';
import { Repository } from 'typeorm';
import { IOrderRepository } from 'domain/interface';
import { OrderEntity } from '../../entities';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async find(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['transaction'],
      });

      if (!order) throw new Error('Order not found');

      return order;
    } catch (error) {
      throw new Error(`Error in get order`, error as Error);
    }
  }

  async save(createOrderDto: CreateOrder): Promise<Order> {
    try {
      const order = {
        ...createOrderDto,
        status: 'PENDING',
      };
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new Error(`Error in save order`, error as Error);
    }
  }
}
