import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderItemTable1713984500000 implements MigrationInterface {
  name = 'CreateOrderItemTable1713984500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "quantity" int NOT NULL,
        "order_id" uuid references orders(id) NOT NULL,
        "product_id" uuid references products(id) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "order_items";
    `);
  }
}
