import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions_log')
export class PayLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  dataOut: string;

  @Column('varchar', { length: 255 })
  reference: string;

  @Column('varchar', { length: 50 })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
