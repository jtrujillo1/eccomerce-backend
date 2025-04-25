import { Logger, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './adapter/out/database';
import {
  OrderController,
  PayController,
  ProductController,
  UserController,
} from './adapter/in/https';
import {
  CalculateSubtotaldHandler,
  CreateOrderHandler,
  GetProductsByIdHandler,
  GetProductsHandler,
  GetUsersHandler,
  UpdateOrderStatusHandler,
} from './handler';
import {
  CalculateSubtotalUseCase,
  CreateOrderUseCase,
  GetProductsByIdUseCase,
  GetProductsUseCase,
  GetUsersUseCase,
  UpdateOrderStatusUseCase,
} from 'domain/usecase';
import {
  OrderRepository,
  ProductRepository,
  UserRepository,
} from './adapter/out/database/repositories';

@Module({
  imports: [CommonModule, DatabaseModule],
  controllers: [
    UserController,
    OrderController,
    ProductController,
    PayController,
  ],
  providers: [
    GetUsersHandler,
    CreateOrderHandler,
    UpdateOrderStatusHandler,
    GetProductsByIdHandler,
    GetProductsHandler,
    CalculateSubtotaldHandler,
    {
      provide: 'GetUsersUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new GetUsersUseCase(userRepository, Logger);
      },
      inject: [UserRepository],
    },
    {
      provide: 'CreateOrderUseCase',
      useFactory: (orderRepository: OrderRepository) => {
        return new CreateOrderUseCase(orderRepository, Logger);
      },
      inject: [OrderRepository],
    },
    {
      provide: 'UpdateOrderStatusUseCase',
      useFactory: (orderRepository: OrderRepository) => {
        return new UpdateOrderStatusUseCase(orderRepository, Logger);
      },
      inject: [OrderRepository],
    },
    {
      provide: 'GetProductsUseCase',
      useFactory: (productRepository: ProductRepository) => {
        return new GetProductsUseCase(productRepository, Logger);
      },
      inject: [ProductRepository],
    },
    {
      provide: 'GetProductsByIdUseCase',
      useFactory: (productRepository: ProductRepository) => {
        return new GetProductsByIdUseCase(productRepository, Logger);
      },
      inject: [ProductRepository],
    },
    {
      provide: 'CalculateSubtotalUseCase',
      useFactory: (productRepository: ProductRepository) => {
        return new CalculateSubtotalUseCase(productRepository, Logger);
      },
      inject: [ProductRepository],
    },
  ],
  exports: [
    GetUsersHandler,
    CreateOrderHandler,
    UpdateOrderStatusHandler,
    GetProductsByIdHandler,
    GetProductsHandler,
    CalculateSubtotaldHandler,
  ],
})
export class AppModule {}
