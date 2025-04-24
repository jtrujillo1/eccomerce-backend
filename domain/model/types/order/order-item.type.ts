import { Product } from '../product/product.type';
import { Order } from './order.type';

export type OrderItem = {
  id: string;
  quantity: number;
  order: Order;
  product: Product;
};
