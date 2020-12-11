import { MigrationInterface, QueryRunner } from "typeorm";

export class Teams1607701877535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "teams" (
          "id" uuid NOT NULL DEFAULT PRIMARY KEY uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "deleted_at" TIMESTAMP,
          "idea_id" uuid NOT NULL,
          "user_id" uuid NOT NULL,
          "is_leader" boolean NOT NULL
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
