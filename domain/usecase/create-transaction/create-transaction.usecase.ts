import { ILogger, IOrderRepository, IPayRepository } from 'domain/interface';
import { CreatePay } from 'domain/model';
import { v4 as uuidv4 } from 'uuid';

export class CreateTransactionUseCase {
  constructor(
    private readonly payRepository: IPayRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(orderId: string) {
    const order = await this.orderRepository.find(orderId);

    if (!order) throw new Error(`Order with id ${orderId} no found`);

    const reference = `ref-${uuidv4()}`;

    const transaction: CreatePay = {
      amountInCents: 0,
      order,
      status: 'PENDING',
      reference,
    };

    return await this.payRepository.save(transaction);
  }
}
