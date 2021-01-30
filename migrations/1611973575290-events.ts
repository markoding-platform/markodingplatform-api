import {MigrationInterface, QueryRunner} from 'typeorm';

export class events1611973575290 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."events" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "title" varchar NOT NULL,
        "description" text NOT NULL,
        "start_date" date NOT NULL,
        "finish_date" date NOT NULL,
        "start_at" time NOT NULL,
        "finish_at" time NOT NULL,
        "image_url" varchar NOT NULL,
        "link" text,

        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "events";`);
  }
}
