import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1713984200000
  implements MigrationInterface
{
  name = 'CreateTransactionsTable1713984200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "transactions" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "reference" varchar(250) UNIQUE,
        "amount_in_cents" decimal(12, 2) NOT NULL,
        "status" varchar NOT NULL,
        "payment_method" varchar(100),
        "payment_at" TIMESTAMP,
        "franchise" varchar(100),
        "bank" varchar(100),
        "cus" varchar(100),
        "order_id" uuid references orders(id) NOT NULL UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "transactions";
    `);
  }
}
