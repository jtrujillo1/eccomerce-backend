import { Order } from './order.type';

export type CreateOrder = Omit<Order, 'id' | 'orderItems'>;
