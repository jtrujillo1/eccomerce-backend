import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../order/order.entity';
import { Pay } from 'domain/model';

@Entity('transactions')
export class PayEntity implements Pay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, unique: true, nullable: true })
  reference?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'amount_in_cents' })
  amountInCents: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'payment_method',
  })
  paymentMethod: string;

  @Column({ type: 'timestamp', nullable: true, name: 'payment_at' })
  paymentAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  franchise: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bank: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cus: string;

  @Column({ type: 'int', nullable: false, name: 'order_id' })
  @Index({ unique: true })
  orderId: string;

  @OneToOne(() => OrderEntity, (order) => order.transaction)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
