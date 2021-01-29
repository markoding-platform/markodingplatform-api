import {MigrationInterface, QueryRunner} from "typeorm";

export class ideaUsers1611927131816 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."idea_users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "is_leader" bool NOT NULL DEFAULT false,
        "idea_id" uuid,
        "user_id" uuid,

        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        CONSTRAINT "FK_idea_id" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("id"),
        PRIMARY KEY ("id")
      );
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "idea_users"`);
  }
}
