import { CreateOrder, Item } from 'domain/model';

import {
  ILogger,
  IOrderItemRepository,
  IOrderRepository,
  IProductRepository,
  IUserRepository,
} from 'domain/interface';
import { CalculateSubtotalUseCase } from '../calculate-subtotal/calculate-subtotal.usecase';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly userRepository: IUserRepository,
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly calculateTotalUseCase: CalculateSubtotalUseCase,
    private readonly productRepository: IProductRepository,
    private readonly logger: ILogger,
  ) {}

  async apply(userId: string, items: Item[]) {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new Error(`User with id ${userId} no found`);

    const { total } = await this.calculateTotalUseCase.apply(items);

    const createOrder: CreateOrder = {
      amountInCents: total,
      status: 'PENDING',
      user: user,
    };

    const order = await this.orderRepository.save(createOrder);

    for (const item of items) {
      const product = await this.productRepository.getProductsStock(
        item.productId,
      );
      const ordenItem = {
        order: order,
        product: product,
        quantity: item.quantity,
      };
      await this.orderItemRepository.save(ordenItem);
    }

    return order;
  }
}
