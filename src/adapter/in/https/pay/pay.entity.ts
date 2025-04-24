import { OrderEntity } from 'src/adapter/out/database/entities/order/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transactions')
export class Pay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true, nullable: true })
  reference?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_cost: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  payment_method: string | null;

  @Column({ type: 'timestamp', nullable: true })
  payment_date: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  franchise: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bank: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cus: string | null;

  @Column({ type: 'int', nullable: false })
  @Index({ unique: true })
  order_id: number;

  @OneToOne(() => OrderEntity, (order) => order.transaction)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
