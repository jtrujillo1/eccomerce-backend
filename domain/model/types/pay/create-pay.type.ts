import { Pay } from './pay.type';

export type CreatePay = Omit<
  Pay,
  'id' | 'orderId' | 'cus' | 'paymentAt' | 'bank' | 'paymentMethod'
>;
