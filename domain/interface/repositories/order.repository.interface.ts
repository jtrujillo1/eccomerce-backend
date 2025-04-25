import { CreateOrderDto } from './../../../src/model/dto/create-order.dto';
import { Order } from 'domain/model';

export interface IOrderRepository {
  find(id: string): Promise<Order>;
  save(createOrderDto: CreateOrderDto): Promise<Order>;
}
