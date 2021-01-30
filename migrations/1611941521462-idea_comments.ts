import {MigrationInterface, QueryRunner} from 'typeorm';

export class ideaComments1611941521462 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."idea_comments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "comment" text NOT NULL,
        "idea_id" uuid,
        "user_id" uuid,

        CONSTRAINT "FK_idea_id" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id"),
        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "idea_comments";`);
  }
}
