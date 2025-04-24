import { Order } from '../order/order.type';

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  order: Order[];
};
