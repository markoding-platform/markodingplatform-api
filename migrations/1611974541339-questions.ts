import {MigrationInterface, QueryRunner} from 'typeorm';

export class questions1611974541339 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."questions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "content" text NOT NULL,
        "channel_id" uuid,
        "user_id" uuid,

        CONSTRAINT "FK_channel_id" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id"),
        CONSTRAINT "FK_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "questions"`);
  }
}
