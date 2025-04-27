import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItem } from 'domain/model';
import { ProductEntity } from '../product/product.entity';

@Entity('order_items')
export class OrderItemEntity implements OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int', nullable: false })
  quantity!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItem)
  @JoinColumn({ name: 'product_id' })
  product!: ProductEntity;
}
