import { CreateOrderItem, OrderItem } from 'domain/model';

export interface IOrderItemRepository {
  save(createOrderItemDto: CreateOrderItem): Promise<OrderItem>;
}
