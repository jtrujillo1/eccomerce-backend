import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePay, Pay } from 'domain/model';
import { Repository } from 'typeorm';
import { IPayRepository } from 'domain/interface';
import { PayEntity } from '../../entities';

@Injectable()
export class PayRepository implements IPayRepository {
  constructor(
    @InjectRepository(PayEntity)
    private readonly payRepository: Repository<PayEntity>,
  ) {}

  async getTransactionByReference(reference: string): Promise<Pay> {
    try {
      const transaction = await this.payRepository.findOne({
        where: { reference },
        relations: ['order', 'order.user'],
      });

      if (!transaction) throw new Error('Transaction not found');

      return transaction;
    } catch (error) {
      throw new Error(`Error in get transaction`, error as Error);
    }
  }

  async getTransaction(id: string): Promise<Pay> {
    try {
      const transaction = await this.payRepository.findOne({
        where: { id },
        relations: ['order'],
      });

      if (!transaction) throw new Error('Transaction not found');

      return transaction;
    } catch (error) {
      throw new Error(`Error in get transaction`, error as Error);
    }
  }

  async save(createPay: CreatePay): Promise<Pay> {
    try {
      return await this.payRepository.save(createPay);
    } catch (error) {
      throw new Error(`Error in save transaction`, error as Error);
    }
  }
}
