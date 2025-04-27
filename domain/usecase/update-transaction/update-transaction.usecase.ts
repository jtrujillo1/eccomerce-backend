import { IOrderRepository, IPayRepository } from 'domain/interface';
import { UpdateTransaction } from 'domain/model';

export class UpdateTransactionUseCase {
  constructor(
    private readonly payRepository: IPayRepository,
    private readonly orderRepository: IOrderRepository,
  ) {}

  async apply(updateTransaction: UpdateTransaction) {
    const transaction = await this.payRepository.getTransactionByReference(
      updateTransaction.reference,
    );

    transaction.paymentMethod = updateTransaction.type;
    transaction.paymentAt = new Date(updateTransaction.finalized_at);
    transaction.cus = updateTransaction.id;

    transaction.status = updateTransaction.status;

    const updatedTransaction = await this.payRepository.save(transaction);

    const order = await this.orderRepository.find(updatedTransaction.order.id);

    order.status = updateTransaction.status;

    await this.orderRepository.save(order);

    return updatedTransaction;
  }
}
