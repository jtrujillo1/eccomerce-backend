import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'domain/model';
import { UpdateOrderStatusUseCase } from 'domain/usecase';

@Injectable()
export class UpdateOrderStatusHandler {
  constructor(
    @Inject('UpdateOrderStatusUseCase')
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  async execute(id: string): Promise<Order> {
    return await this.updateOrderStatusUseCase.apply(id);
  }
}
