import {MigrationInterface, QueryRunner} from 'typeorm';

export class banners1611974131020 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."banners" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "image_url" varchar NOT NULL,
        "link" varchar NOT NULL,
        "sort" int2 NOT NULL,
        "is_active" bool NOT NULL,
        "start_at" timestamp NOT NULL,
        "end_at" timestamp NOT NULL,
        "title" text NOT NULL,
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "banners";`);
  }
}
