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
  FindOrCreateUserHandler,
  CreateTransactionHandler,
  GetAcceptanceTokenHandler,
  TokenizeCardHandler,
  CreateWompiTransactionHandler,
  UpdateTransactionHandler,
} from './handler';
import {
  CalculateSubtotalUseCase,
  CreateOrderUseCase,
  CreateTransactionUseCase,
  CreateWompiTransactionUseCase,
  FindOrCreateUserUseCase,
  GetAcceptanceTokenUseCase,
  GetProductsByIdUseCase,
  GetProductsUseCase,
  GetUsersUseCase,
  TokenizeCardUseCase,
  UpdateOrderStatusUseCase,
  UpdateTransactionUseCase,
} from 'domain/usecase';
import {
  OrderItemRepository,
  OrderRepository,
  PayRepository,
  ProductRepository,
  UserRepository,
} from './adapter/out/database/repositories';
import { WompiModule, WompiService } from './adapter/out/services';

@Module({
  imports: [CommonModule, DatabaseModule, WompiModule],
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
    FindOrCreateUserHandler,
    CreateTransactionHandler,
    GetAcceptanceTokenHandler,
    TokenizeCardHandler,
    CreateWompiTransactionHandler,
    UpdateTransactionHandler,
    {
      provide: 'GetUsersUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new GetUsersUseCase(userRepository, Logger);
      },
      inject: [UserRepository],
    },
    {
      provide: 'CreateOrderUseCase',
      useFactory: (
        orderRepository: OrderRepository,
        userRepository: UserRepository,
        orderItemRepository: OrderItemRepository,
        calculateTotalUseCase: CalculateSubtotalUseCase,
        productRepository: ProductRepository,
      ) => {
        return new CreateOrderUseCase(
          orderRepository,
          userRepository,
          orderItemRepository,
          calculateTotalUseCase,
          productRepository,
          Logger,
        );
      },
      inject: [
        OrderRepository,
        UserRepository,
        OrderItemRepository,
        'CalculateSubtotalUseCase',
        ProductRepository,
      ],
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
    {
      provide: 'FindOrCreateUserUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new FindOrCreateUserUseCase(userRepository, Logger);
      },
      inject: [UserRepository],
    },
    {
      provide: 'CreateTransactionUseCase',
      useFactory: (
        payRepository: PayRepository,
        orderRepository: OrderRepository,
      ) => {
        return new CreateTransactionUseCase(
          payRepository,
          orderRepository,
          Logger,
        );
      },
      inject: [PayRepository, OrderRepository],
    },
    {
      provide: 'GetAcceptanceTokenUseCase',
      useFactory: (wompiService: WompiService) => {
        return new GetAcceptanceTokenUseCase(wompiService, Logger);
      },
      inject: [WompiService],
    },
    {
      provide: 'TokenizeCardUseCase',
      useFactory: (wompiService: WompiService) => {
        return new TokenizeCardUseCase(wompiService, Logger);
      },
      inject: [WompiService],
    },
    {
      provide: 'CreateWompiTransactionUseCase',
      useFactory: (
        wompiService: WompiService,
        payRepository: PayRepository,
      ) => {
        return new CreateWompiTransactionUseCase(
          wompiService,
          payRepository,
          Logger,
        );
      },
      inject: [WompiService, PayRepository, OrderRepository],
    },
    {
      provide: 'UpdateTransactionUseCase',
      useFactory: (
        payRepository: PayRepository,
        orderRepository: OrderRepository,
      ) => {
        return new UpdateTransactionUseCase(payRepository, orderRepository);
      },
      inject: [PayRepository, OrderRepository],
    },
  ],
  exports: [
    GetUsersHandler,
    CreateOrderHandler,
    UpdateOrderStatusHandler,
    GetProductsByIdHandler,
    GetProductsHandler,
    CalculateSubtotaldHandler,
    FindOrCreateUserHandler,
    CreateTransactionHandler,
    GetAcceptanceTokenHandler,
    TokenizeCardHandler,
    CreateWompiTransactionHandler,
    UpdateTransactionHandler,
  ],
})
export class AppModule {}
