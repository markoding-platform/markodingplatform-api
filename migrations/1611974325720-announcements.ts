import {MigrationInterface, QueryRunner} from 'typeorm';

export class announcements1611974325720 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."announcements" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "title" varchar NOT NULL,
        "subtitle" text NOT NULL,
        "datetime" timestamp NOT NULL,
        "url" varchar NOT NULL,
        "user_id" uuid,
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "announcements";`);
  }
}
