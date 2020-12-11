import { MigrationInterface, QueryRunner } from "typeorm";

export class Nonces1607702018957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "nonces" (
        "id" uuid NOT NULL DEFAULT PRIMARY KEY uuid_generate_v4(),
        "nonce" character varying NOT NULL,
        "expired_at" TIMESTAMP NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "nonces"`);
  }
}
