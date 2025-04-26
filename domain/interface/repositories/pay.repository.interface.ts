
import { CreatePay, Pay } from 'domain/model';

export interface IPayRepository {
  getTransaction(id: string): Promise<Pay>;
  save(createOrderDto: CreatePay): Promise<Pay>;
}
