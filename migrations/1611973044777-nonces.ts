import {MigrationInterface, QueryRunner} from 'typeorm';

export class nonces1611973044777 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."nonces" (
        "id" uuid NOT NULL DEFAULT
        uuid_generate_v4(),
        "nonce" varchar NOT NULL,
        "expired_at" timestamp NOT NULL,

        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "nonces";`);
  }
}
