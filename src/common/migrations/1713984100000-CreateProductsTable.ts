import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1713984100000 implements MigrationInterface {
  name = 'CreateProductsTable1713984100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar(100) NOT NULL,
        "description" varchar(250) NOT NULL,
        "stock" int NOT NULL DEFAULT 0,
        "url_img" varchar(250) NOT NULL,
        "amount-in-cents" decimal(12, 2) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "products";
    `);
  }
}
