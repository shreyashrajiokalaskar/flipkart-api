import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1736142148930 implements MigrationInterface {
  name = "Migrations1736142148930";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the index on the `pincode` column in the `cities` table
    await queryRunner.query(
      `CREATE INDEX "IDX_cities_pincode" ON "cities" ("pincode")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the index during rollback
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cities_pincode"`
    );
  }
}
