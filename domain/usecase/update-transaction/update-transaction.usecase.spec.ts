import { UpdateTransactionUseCase } from './update-transaction.usecase';
import { IPayRepository, IOrderRepository } from 'domain/interface';
import { UpdateTransaction, Order, Pay } from 'domain/model';

describe('UpdateTransactionUseCase', () => {
  let useCase: UpdateTransactionUseCase;
  let payRepository: jest.Mocked<IPayRepository>;
  let orderRepository: jest.Mocked<IOrderRepository>;

  beforeEach(() => {
    payRepository = {
      getTransactionByReference: jest.fn(),
      save: jest.fn(),
      getTransaction: jest.fn(),
    } as jest.Mocked<IPayRepository>;

    orderRepository = {
      find: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<IOrderRepository>;

    useCase = new UpdateTransactionUseCase(payRepository, orderRepository);
  });

  it('should update transaction and order status', async () => {
    const updateTransaction: UpdateTransaction = {
      reference: 'ref123',
      type: 'credit_card',
      finalized_at: new Date().toISOString(),
      id: 'cus123',
      status: 'completed',
    } as UpdateTransaction;

    const transaction = {
      reference: 'ref123',
      paymentMethod: '',
      paymentAt: new Date(),
      cus: '',
      status: '',
      order: { id: 'order123' } as Order,
    } as Pay;

    const updatedTransaction: Pay = {
      ...transaction,
      paymentMethod: updateTransaction.type,
      paymentAt: new Date(updateTransaction.finalized_at),
      cus: updateTransaction.id,
      status: updateTransaction.status,
    };

    const order: Order = {
      id: 'order123',
      status: 'pending',
    } as Order;

    payRepository.getTransactionByReference.mockResolvedValue(transaction);
    payRepository.save.mockResolvedValue(updatedTransaction);
    orderRepository.find.mockResolvedValue(order);
    orderRepository.save.mockResolvedValue(order);

    const result = await useCase.apply(updateTransaction);

    expect(payRepository.getTransactionByReference).toHaveBeenCalledWith(
      updateTransaction.reference,
    );
    expect(payRepository.save).toHaveBeenCalledWith(updatedTransaction);
    expect(orderRepository.find).toHaveBeenCalledWith(order.id);
    expect(orderRepository.save).toHaveBeenCalledWith({
      ...order,
      status: updateTransaction.status,
    });
    expect(result).toEqual(updatedTransaction);
  });
});
