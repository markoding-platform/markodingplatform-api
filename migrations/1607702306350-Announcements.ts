import { MigrationInterface, QueryRunner } from "typeorm";

export class Announcements1607702306350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "announcements" (
          "id" uuid NOT NULL DEFAULT PRIMARY KEY uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updated_at" TIMESTAMP NOT NULL DEF AULT NOW(),
          "deleted_at" TIMESTAMP,
          "title" character varying(255) NOT NULL,
          "subtitle" text NOT NULL,
          "datetime" TIMESTAMP NOT NULL,
          "url" character varying(255) NOT NULL,
          "user_id" uuid
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "announcements"`);
  }
}
