import { CreateOrderDto } from './../../../src/model/dto/create-order.dto';
import { ILogger, IOrderRepository } from 'domain/interface';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(createOrderDto: CreateOrderDto) {
    this.logger.log('Creating order', CreateOrderUseCase.name);
    return await this.orderRepository.save(createOrderDto);
  }
}
