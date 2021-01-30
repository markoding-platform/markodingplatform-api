import {MigrationInterface, QueryRunner} from 'typeorm';

export class questionComments1611974835089 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "question_comments_id_seq";`);
    await queryRunner.query(`
      CREATE TABLE "public"."question_comments" (
        "id" int4 NOT NULL DEFAULT nextval('question_comments_id_seq'::regclass),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "content" text NOT NULL,
        "question_id" uuid,
        "user_id" uuid,

        CONSTRAINT "FK_question_id" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id"),
        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "question_comments";`);
    await queryRunner.query(`DROP SEQUENCE "question_commens_id_seq";`);
  }
}
