import { CreateOrderUseCase } from './create-order.usecase';
import {
  IOrderRepository,
  IUserRepository,
  IOrderItemRepository,
  IProductRepository,
  ILogger,
} from 'domain/interface';
import { CalculateSubtotalUseCase } from '../calculate-subtotal/calculate-subtotal.usecase';
import {
  Item,
  CreateOrder,
  Order,
  Product,
  User,
  OrderItem,
} from 'domain/model';

describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let userRepository: jest.Mocked<IUserRepository>;
  let orderItemRepository: jest.Mocked<IOrderItemRepository>;
  let productRepository: jest.Mocked<IProductRepository>;
  let logger: jest.Mocked<ILogger>;
  let calculateSubtotalUseCase: jest.Mocked<CalculateSubtotalUseCase>;

  beforeEach(() => {
    orderRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<IOrderRepository>;

    userRepository = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    orderItemRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<IOrderItemRepository>;

    productRepository = {
      getProductsStock: jest.fn(),
    } as unknown as jest.Mocked<IProductRepository>;

    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ILogger>;

    calculateSubtotalUseCase = {
      apply: jest.fn(),
    } as unknown as jest.Mocked<CalculateSubtotalUseCase>;

    useCase = new CreateOrderUseCase(
      orderRepository,
      userRepository,
      orderItemRepository,
      calculateSubtotalUseCase,
      productRepository,
      logger,
    );
  });

  it('should create order successfully', async () => {
    const userId = 'user-1';
    const items: Item[] = [
      { productId: 'p1', quantity: 2 },
      { productId: 'p2', quantity: 3 },
    ];

    const user: User = {
      id: userId,
      email: 'dummy@email',
      createdAt: new Date(),
    } as User;

    const total = 7000;

    const order: Order = {
      id: 'order-1',
      amountInCents: total,
      status: 'PENDING',
      user: user,
    } as Order;

    const product1: Product = {
      id: 'p1',
      name: 'Product 1',
      amountInCents: 1000,
    } as Product;

    const product2: Product = {
      id: 'p2',
      name: 'Product 2',
      amountInCents: 2000,
    } as Product;

    userRepository.findOne.mockResolvedValue(user);
    calculateSubtotalUseCase.apply.mockResolvedValue({ total });
    orderRepository.save.mockResolvedValue(order);

    orderItemRepository.save.mockResolvedValue({} as OrderItem);

    const result = await useCase.apply(userId, items);

    expect(userRepository.findOne).toHaveBeenCalledWith(userId);
    expect(calculateSubtotalUseCase.apply).toHaveBeenCalledWith(items);
    expect(orderRepository.save).toHaveBeenCalledWith({
      amountInCents: total,
      status: 'PENDING',
      user: user,
    } as CreateOrder);
    expect(productRepository.getProductsStock).toHaveBeenCalledTimes(
      items.length,
    );
    expect(orderItemRepository.save).toHaveBeenCalledTimes(items.length);
    expect(result).toEqual(order);
  });

  it('should throw error if user not found', async () => {
    const userId = 'user-1';
    const items: Item[] = [];

    userRepository.findOne.mockResolvedValue(null);

    await expect(useCase.apply(userId, items)).rejects.toThrowError(
      `User with id ${userId} no found`,
    );

    expect(userRepository.findOne).toHaveBeenCalledWith(userId);
  });
});
