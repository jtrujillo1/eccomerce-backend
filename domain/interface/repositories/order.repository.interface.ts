import { CreateOrder, Order } from 'domain/model';

export interface IOrderRepository {
  find(id: string): Promise<Order>;
  save(createOrderDto: CreateOrder): Promise<Order>;
}
