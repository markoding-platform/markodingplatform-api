import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterIdeaUsers1612446758092 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "public"."idea_users"
      ADD UNIQUE ("idea_id", "user_id");
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "public"."idea_users"
      DROP CONSTRAINT "idea_users_idea_id_user_id_key";
    `);
  }
}
