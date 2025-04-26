import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1713984110000 implements MigrationInterface {
  name = 'CreateOrderTable1713984110000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "status" varchar(50) NOT NULL DEFAULT 'lq',
        "amount_in_cents" decimal(12, 2) NOT NULL,
        "user_id" uuid references users(id) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "order";
    `);
  }
}
