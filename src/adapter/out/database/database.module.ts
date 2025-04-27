import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './connection/typeorm.config';
import { Global, Module } from '@nestjs/common';
import {
  OrderEntity,
  OrderItemEntity,
  PayEntity,
  ProductEntity,
  UserEntity,
} from './entities';
import {
  PayRepository,
  ProductRepository,
  UserRepository,
} from './repositories';
import { OrderRepository } from './repositories/order/order.repository';
import { OrderItemRepository } from './repositories/order-item/order-item.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig(),
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      PayEntity,
      UserEntity,
      ProductEntity,
    ]),
  ],
  providers: [
    UserRepository,
    OrderRepository,
    ProductRepository,
    PayRepository,
    OrderItemRepository,
  ],
  exports: [
    UserRepository,
    OrderRepository,
    ProductRepository,
    PayRepository,
    OrderItemRepository,
  ],
})
export class DatabaseModule {}
