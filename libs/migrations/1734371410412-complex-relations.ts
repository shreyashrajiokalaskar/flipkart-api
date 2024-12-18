import { MigrationInterface, QueryRunner } from "typeorm";

export class ComplexRelations1734371410412 implements MigrationInterface {
    name = 'ComplexRelations1734371410412';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check and drop foreign key constraints only if they exist
        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_93e963c47272eb995d0b9ac533f') THEN
                ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f";
            END IF;
        END $$;`);
        
        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_7d42ce111ef9b507cc28b098fce') THEN
                ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce";
            END IF;
        END $$;`);
        
        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_9805ee71aa117dee3c3f60f5271') THEN
                ALTER TABLE "reviews" DROP CONSTRAINT "FK_9805ee71aa117dee3c3f60f5271";
            END IF;
        END $$;`);

        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_a6b3c434392f5d10ec171043666') THEN
                ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666";
            END IF;
        END $$;`);

        // Drop indexes related to constraints
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_93e963c47272eb995d0b9ac533"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_7d42ce111ef9b507cc28b098fc"`);

        // Drop primary key constraints temporarily to allow modifications
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT IF EXISTS "PK_18f2befaa7c571058ddaef4eb98"`);

        // Apply schema changes
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN IF EXISTS "assetId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "sellerId" uuid`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "deletedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "quantity" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "price" double precision NOT NULL`);

        // Create the enum type for the orderProducts status
        await queryRunner.query(`CREATE TYPE "public"."orderProducts_status_enum" AS ENUM('PLACED', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURN_REQUESTED', 'RETURNED', 'REFUNDED', 'CANCELLED', 'FAILED')`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "status" "public"."orderProducts_status_enum" NOT NULL DEFAULT 'PLACED'`);

        // Add primary key back after modifications
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "PK_18f2befaa7c571058ddaef4eb98" PRIMARY KEY ("orderId", "productId")`);

        // Add new foreign key constraints
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_9805ee71aa117dee3c3f60f5271" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Recreate indexes after constraints have been added back
        await queryRunner.query(`CREATE INDEX "IDX_93e963c47272eb995d0b9ac533" ON "orderProducts" ("orderId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7d42ce111ef9b507cc28b098fc" ON "orderProducts" ("productId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Same checks for dropping constraints in down migration
        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_93e963c47272eb995d0b9ac533f') THEN
                ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f";
            END IF;
        END $$;`);

        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_7d42ce111ef9b507cc28b098fce') THEN
                ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce";
            END IF;
        END $$;`);

        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_9805ee71aa117dee3c3f60f5271') THEN
                ALTER TABLE "reviews" DROP CONSTRAINT "FK_9805ee71aa117dee3c3f60f5271";
            END IF;
        END $$;`);

        await queryRunner.query(`DO $$ BEGIN
            IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_a6b3c434392f5d10ec171043666') THEN
                ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666";
            END IF;
        END $$;`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_93e963c47272eb995d0b9ac533"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_7d42ce111ef9b507cc28b098fc"`);

        // Drop the enum and columns
        await queryRunner.query(`DROP TYPE "public"."orderProducts_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "id"`);
        
        // Remove foreign keys from the reviews table
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "sellerId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "assetId" uuid NOT NULL`);

        // Recreate primary key after removing columns
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "PK_18f2befaa7c571058ddaef4eb98" PRIMARY KEY ("orderId", "productId")`);

        // Recreate the old indexes
        await queryRunner.query(`CREATE INDEX "IDX_93e963c47272eb995d0b9ac533" ON "orderProducts" ("orderId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7d42ce111ef9b507cc28b098fc" ON "orderProducts" ("productId")`);

        // Recreate foreign key constraints with CASCADE rules for safe rollback
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
