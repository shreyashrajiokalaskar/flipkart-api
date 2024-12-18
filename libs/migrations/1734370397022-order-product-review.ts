import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProductReview1734370397022 implements MigrationInterface {
    name = 'OrderProductReview1734370397022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reviews_assettype_enum" AS ENUM('PRODUCT', 'SELLER')`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" text NOT NULL, "rating" double precision NOT NULL, "assetType" "public"."reviews_assettype_enum" NOT NULL DEFAULT 'PRODUCT', "reviewerId" uuid NOT NULL, "assetId" uuid NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "stock" numeric NOT NULL, "discountPercentage" double precision NOT NULL, "minOrderQuantity" numeric NOT NULL DEFAULT '1', "categoryId" uuid NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP NOT NULL DEFAULT now(), "method" character varying NOT NULL, "status" character varying NOT NULL, "transactionId" uuid NOT NULL, "gateway" character varying NOT NULL, "amount" double precision NOT NULL, "orderId" uuid NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "productId" uuid NOT NULL, "addressId" uuid NOT NULL, "quantity" numeric NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderProducts" ("orderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_18f2befaa7c571058ddaef4eb98" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_93e963c47272eb995d0b9ac533" ON "orderProducts" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d42ce111ef9b507cc28b098fc" ON "orderProducts" ("productId") `);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_f9238c3e3739dc40322f577fc46" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_37636d260931dcf46d11892f614" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_37636d260931dcf46d11892f614"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_f9238c3e3739dc40322f577fc46"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d42ce111ef9b507cc28b098fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93e963c47272eb995d0b9ac533"`);
        await queryRunner.query(`DROP TABLE "orderProducts"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TYPE "public"."reviews_assettype_enum"`);
    }

}
