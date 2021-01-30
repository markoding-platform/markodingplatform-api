import {MigrationInterface, QueryRunner} from 'typeorm';

export class ideaProblemAreas1611846774662 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "idea_problem_areas_id_seq";`);
    await queryRunner.query(`
      CREATE TABLE "public"."idea_problem_areas" (
        "id" int4 NOT NULL DEFAULT nextval('idea_problem_areas_id_seq'::regclass),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "problem_area" varchar NOT NULL,

        PRIMARY KEY ("id")
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "idea_problem_areas";`);
    await queryRunner.query(`DROP SEQUENCE "idea_problem_areas_id_seq";`);
  }
}
