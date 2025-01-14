import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1736790949061 implements MigrationInterface {
  name = "Migrations1736790949061";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD "isHome" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "resetToken" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "resetTokenExpiry" bigint`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "resetTokenExpiry"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetToken"`);
    await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "isHome"`);
  }
}
