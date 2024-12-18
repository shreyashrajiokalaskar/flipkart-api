import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Migrations1734548269265 implements MigrationInterface {
  name = 'Migrations1734548269265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      'users',
      'roles',
      'addresses',
      'categories',
      'cities',
      'orderProducts',
      'reviews',
      'orders',
      'payments',
      'products',
    ];

    for (const table of tables) {
      await queryRunner.changeColumn(
        table,
        'deletedAt',
        new TableColumn({
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true, // Removing the NOT NULL constraint
          default: null
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      'users',
      'roles',
      'addresses',
      'categories',
      'cities',
      'orderProducts',
      'reviews',
      'orders',
      'payments',
      'products',
    ];

    for (const table of tables) {
      await queryRunner.changeColumn(
        table,
        'deletedAt',
        new TableColumn({
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: false, // Re-adding NOT NULL constraint
          default: 'CURRENT_TIMESTAMP', // Default value if required
        }),
      );
    }
  }
}
