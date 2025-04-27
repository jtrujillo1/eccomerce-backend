import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'domain/model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './order-item.entity';
import { PayEntity } from '../pay/pay.entity';

@Entity('orders')
export class OrderEntity implements Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, default: 'lq', nullable: false })
  status!: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    name: 'amount_in_cents',
  })
  amountInCents!: number;

  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems!: OrderItemEntity[];

  @OneToOne(() => PayEntity, (transaction) => transaction.order)
  transaction!: PayEntity;
}
