import { OrderItem } from '../order/order-item.type';

export type Product = {
  id: string;
  name: string;
  description: string;
  stock: number;
  urlImg: string;
  amountInCents: number;
  orderItem: OrderItem[];
};
