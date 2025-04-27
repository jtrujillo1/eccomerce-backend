import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from 'domain/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../order/order.entity';

@Entity('users')
export class UserEntity implements User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order!: OrderEntity[];
}
