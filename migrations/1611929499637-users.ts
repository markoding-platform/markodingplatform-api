import {MigrationInterface, QueryRunner} from "typeorm";

export class users1611929499637 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "public"."users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "profile_id" uuid,
        "name" varchar NOT NULL,
        "email" varchar NOT NULL,
        "external_id" varchar NOT NULL,
        "is_email_verified" bool NOT NULL DEFAULT false,

        CONSTRAINT "FK_profile_id" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id"),
        PRIMARY KEY ("id")
      );
    `)
    await queryRunner.query(`CREATE UNIQUE INDEX "idx_email" ON "public"."ideas" ("email");`);
    await queryRunner.query(`CREATE UNIQUE INDEX "idx_external_id" ON "public"."ideas" ("external_id");`);
    await queryRunner.query(`CREATE INDEX "idx_name" ON "public"."ideas" ("name");`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
