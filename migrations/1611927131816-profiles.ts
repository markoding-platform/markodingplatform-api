import {MigrationInterface, QueryRunner} from "typeorm";

export class profiles1611927131816 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."profiles_profile_type_enum" AS ENUM (
        'supporter',
        'mentor',
        'teacher',
        'student'
      );
    `)
    await queryRunner.query(`
      CREATE TYPE "public"."profiles_gender_enum" AS ENUM ('perempuan', 'laki-laki');
    `)
    await queryRunner.query(`
      CREATE TABLE "public"."profiles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,
        "profile_type" "public"."profiles_profile_type_enum" NOT NULL DEFAULT 'student'::profiles_profile_type_enum,
        "school_id" varchar,
        "school_name" varchar,
        "school_type_id" varchar,
        "school_type_name" varchar,
        "school_grade_id" varchar,
        "school_grade_name" varchar,
        "class_id" varchar,
        "class_name" varchar,
        "city_id" varchar,
        "city_name" varchar,
        "province_id" varchar,
        "province_name" varchar,
        "working_position" varchar,
        "company_name" varchar,
        "expertise" varchar,
        "start_teaching_year" int4,
        "last_education_grade_id" varchar,
        "last_education_grade_name" varchar,
        "gender" "public"."profiles_gender_enum",
        "bio" text,
        "date_of_birth" date,
        "telephone" varchar,
        "linkedin_url" varchar,
        "instagram_url" varchar,
        "profile_picture_url" varchar,

        PRIMARY KEY ("id")
      );
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profiles";`);
    await queryRunner.query(`DROP TYPE "profiles_profile_type_enum";`);
    await queryRunner.query(`DROP TYPE "profiles_gender_enum";`);
  }
}
