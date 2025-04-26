import { Pay } from '../pay/pay.type';
import { User } from '../user/user.type';
import { OrderItem } from './order-item.type';

export type Order = {
  id: string;
  status: string;
  amountInCents: number;
  user: User;
  orderItems: OrderItem[];
  transaction?: Pay;
};
