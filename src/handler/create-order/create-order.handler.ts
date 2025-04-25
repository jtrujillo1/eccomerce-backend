import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'domain/model';
import { CreateOrderUseCase } from 'domain/usecase';
import { CreateOrderDto } from 'src/model/dto';

@Injectable()
export class CreateOrderHandler {
  constructor(
    @Inject('CreateOrderUseCase')
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.createOrderUseCase.apply(createOrderDto);
  }
}
