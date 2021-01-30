import {MigrationInterface, QueryRunner} from 'typeorm';

export class questionLikes1611974678628 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "question_likes_id_seq";`);
    await queryRunner.query(`
      CREATE TABLE "public"."question_likes" (
        "id" int4 NOT NULL DEFAULT nextval('question_likes_id_seq'::regclass),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "is_like" bool NOT NULL DEFAULT false,
        "question_id" uuid,
        "user_id" uuid,

        CONSTRAINT "FK_question_id" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id"),
        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "question_likes";`);
    await queryRunner.query(`DROP SEQUENCE "question_likes_id_seq";`);
  }
}
