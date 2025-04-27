import 'dotenv/config';
import { DataSource } from 'typeorm';
import {
  OrderEntity,
  OrderItemEntity,
  PayEntity,
  ProductEntity,
  UserEntity,
} from '../entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    ProductEntity,
    OrderItemEntity,
    OrderEntity,
    UserEntity,
    PayEntity,
  ],
  synchronize: true,
});
