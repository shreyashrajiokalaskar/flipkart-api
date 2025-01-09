import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Migrations1736403417396 implements MigrationInterface {
    name = 'Migrations1736403417396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "isDefault" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" bigint UNIQUE`);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "isDefault"`);
    }

}
