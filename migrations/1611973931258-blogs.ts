import {MigrationInterface, QueryRunner} from 'typeorm';

export class blogs1611973931258 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."blogs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" varchar NOT NULL,
        "description" text NOT NULL,
        "image_url" varchar NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "date" date,

        PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_title" ON "public"."blogs" ("title");`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blogs";`);
  }
}
