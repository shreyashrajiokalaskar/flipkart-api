    import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

    export class Migrations1735649831356 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.addColumn('products', new TableColumn({
                name: 'rating',
                type: 'float',
                isNullable: true,
            }));
            await queryRunner.addColumn('products', new TableColumn({
                name: 'brand',
                type: 'text',
                isNullable: true
            }));
        }

        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropColumn('products', 'rating');
            await queryRunner.dropColumn('products', 'brand');
        }

    }
