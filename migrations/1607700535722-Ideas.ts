import { MigrationInterface, QueryRunner } from "typeorm";

export class Ideas1607700535722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "ideas" (
          "id" uuid NOT NULL DEFAULT PRIMARY KEY uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
          "deleted_at" TIMESTAMP,
          "school_id" uuid NOT NULL,
          "teacher_id" uuid NOT NULL,
          "solution_name" text NOT NULL,
          "solution_type" character(6) NOT NULL,
          "problem_area" character varying(255) N OT NULL,
          "problem_selection" text NOT NULL,
          "problem_reasoning" text NOT NULL,
          "solution_vision" text NOT NULL,
          "solution_mission" text NOT NULL,
          "solution_benefit" text NOT NULL,
          "solution_obstacle" text NOT NULL,
          "solution_pitch_url" character varying(255) NOT NULL,
          "target_outcomes" text NOT NULL,
          "target_customer" text NOT NULL,
          "potential_collaboration" text NOT NULL,
          "solution_supporting_photos" text NOT NULL,
          "is_draft" boolean NOT NULL
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ideas"`);
  }
}
