import { Product } from 'domain/model';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderItemEntity } from '../order/order-item.entity';

@Entity('products')
export class ProductEntity implements Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', length: 1000, name: 'url_img' })
  urlImg: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'amount_in_cents' })
  amountInCents: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItem: OrderItemEntity[];
}
