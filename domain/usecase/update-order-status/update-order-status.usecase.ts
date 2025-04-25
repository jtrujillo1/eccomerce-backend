import { ILogger, IOrderRepository } from 'domain/interface';

export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(id: string) {
    this.logger.log(
      `Search transaction with id ${id}`,
      UpdateOrderStatusUseCase.name,
    );
    return await this.orderRepository.find(id);
  }
}
