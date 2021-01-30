import {MigrationInterface, QueryRunner} from 'typeorm';

export class chats1611973297384 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "chats_id_seq";`);
    await queryRunner.query(`CREATE TABLE "public"."chats" (
      "id" int4 NOT NULL DEFAULT nextval('chats_id_seq'::regclass),
      "created_at" timestamp NOT NULL DEFAULT now(),
      "updated_at" timestamp NOT NULL DEFAULT now(),
      "deleted_at" timestamp,
      "content" text NOT NULL,
      "type" bpchar NOT NULL,
      "user_id" uuid,

      CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
      PRIMARY KEY ("id")
    );`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chats";`);
    await queryRunner.query(`DROP SEQUENCE "chats_id_seq";`);
  }
}
