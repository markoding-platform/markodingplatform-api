import {MigrationInterface, QueryRunner} from 'typeorm';

export class Ideas1611846774662 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "public"."ideas_status_enum" AS ENUM (
            'pemenang',
            'finalis',
            'peserta'
        );
    `);
    await queryRunner.query(`
        CREATE TYPE "public"."ideas_solution_type_enum" AS ENUM (
            'game',
            'mobile',
            'web'
        );
    `);

    /* eslint-disable */
    await queryRunner.query(`
        CREATE TABLE "public"."ideas" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now(),
            "deleted_at" timestamp,
            "status" "public"."ideas_status_enum" NOT NULL DEFAULT 'peserta'::ideas_status_enum,
            "school_id" varchar NOT NULL,
            "school_name" text NOT NULL,
            "solution_name" text NOT NULL,
            "solution_type" "public"."ideas_solution_type_enum" NOT NULL,
            "problem_selection" text NOT NULL,
            "problem_reasoning" text NOT NULL,
            "solution_vision" text NOT NULL,
            "solution_mission" text NOT NULL,
            "solution_benefit" text NOT NULL,
            "solution_obstacle" text NOT NULL,
            "solution_pitch_url" varchar,
            "target_outcomes" text NOT NULL,
            "target_customer" text NOT NULL,
            "potential_collaboration" text,
            "solution_supporting_photos" text,
            "is_draft" bool NOT NULL,
            "liked" int4 NOT NULL DEFAULT 0,
            "problem_area_id" int4,

            CONSTRAINT "FK_problem_area_id" FOREIGN KEY ("problem_area_id") REFERENCES "public"."idea_problem_areas"("id"),
            PRIMARY KEY ("id")
        );
    `);
    /* eslint-enable */

    await queryRunner.query(`
        CREATE INDEX "idx_status" ON "public"."ideas" ("status");
    `);
    await queryRunner.query(`
        CREATE INDEX "idx_solution_type" ON "public"."ideas" ("solution_type");
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ideas"`);
    await queryRunner.query(`DROP TYPE "ideas_status_enum";`);
    await queryRunner.query(`DROP TYPE "ideas_solution_type_enum";`);
  }
}
