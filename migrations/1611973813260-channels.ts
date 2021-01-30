import {MigrationInterface, QueryRunner} from 'typeorm';

export class channels1611973813260 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."channels" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "name" varchar NOT NULL,

        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "channels";`);
  }
}
