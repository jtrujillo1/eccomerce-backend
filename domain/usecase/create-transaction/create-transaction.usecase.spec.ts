import { CreateTransactionUseCase } from './create-transaction.usecase';
import { IPayRepository, IOrderRepository, ILogger } from 'domain/interface';
import { CreatePay, Order, Pay } from 'domain/model';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let payRepository: jest.Mocked<IPayRepository>;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    payRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<IPayRepository>;

    orderRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IOrderRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new CreateTransactionUseCase(
      payRepository,
      orderRepository,
      logger,
    );
  });

  it('should create transaction successfully', async () => {
    const orderId = 'order-1';

    const order: Order = {
      id: orderId,
    } as Order;

    const savedTransaction = {
      id: 'transaction-1',
      amountInCents: 0,
      order,
      status: 'PENDING',
      reference: 'ref-uuid',
    } as CreatePay;

    const Transaction = {
      id: 'transaction-1',
      amountInCents: 0,
      order,
      status: 'PENDING',
      reference: 'ref-uuid',
      bank: '',
      cus: '',
      orderId: 'order-1',
      paymentAt: new Date(),
      paymentMethod: '',
    } as Pay;

    orderRepository.find.mockResolvedValue(order);
    payRepository.save.mockResolvedValue(Transaction);

    const result = await useCase.apply(orderId);

    expect(orderRepository.find).toHaveBeenCalledWith(orderId);
    expect(payRepository.save).toHaveBeenCalled();
    expect(result).toEqual(Transaction);
  });

  it('should throw error if order not found', async () => {
    const orderId = 'order-1';

    await expect(useCase.apply(orderId)).rejects.toThrowError(
      `Order with id ${orderId} no found`,
    );

    expect(orderRepository.find).toHaveBeenCalledWith(orderId);
  });
});
