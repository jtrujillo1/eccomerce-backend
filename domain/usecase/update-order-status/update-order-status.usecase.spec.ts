import { UpdateOrderStatusUseCase } from './update-order-status.usecase';
import { IOrderRepository, ILogger } from 'domain/interface';
import { Order } from 'domain/model';

describe('UpdateOrderStatusUseCase', () => {
  let useCase: UpdateOrderStatusUseCase;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let logger: jest.Mocked<ILogger>;

  beforeEach(() => {
    orderRepository = {
      find: jest.fn(),
    } as unknown as jest.Mocked<IOrderRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    useCase = new UpdateOrderStatusUseCase(orderRepository, logger);
  });

  it('should log and return order by id', async () => {
    const orderId = 'order-1';
    const order: Order = {
      id: orderId,
      status: 'pending',
    } as Order;

    orderRepository.find.mockResolvedValue(order);

    const result = await useCase.apply(orderId);

    expect(logger.log).toHaveBeenCalledWith(
      `Search transaction with id ${orderId}`,
      'UpdateOrderStatusUseCase',
    );
    expect(orderRepository.find).toHaveBeenCalledWith(orderId);
    expect(result).toEqual(order);
  });
});
