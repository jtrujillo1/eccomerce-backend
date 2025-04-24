import { Order } from '../order/order.type';

export type Pay = {
  id: string;
  reference?: string;
  amountInCents: number;
  status: string;
  paymentMethod: string;
  paymentAt: Date;
  bank: string;
  cus: string;
  orderId: string;
  order: Order;
};
