import {MigrationInterface, QueryRunner} from 'typeorm';

export class userPoints1611975020492 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."user_points" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "activity_type" varchar NOT NULL,
        "activity_text" text NOT NULL,
        "point" int8 NOT NULL,
        "user_id" uuid,

        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_points";`);
  }
}
