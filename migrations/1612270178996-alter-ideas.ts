import {MigrationInterface, QueryRunner} from 'typeorm';

export class alterIdeas1612270178996 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."ideas_status_enum" RENAME TO "ideas_status_enum_old";`,
    );
    await queryRunner.query(
      `CREATE TYPE "ideas_status_enum" AS ENUM('onreview', 'peserta', 'finalis', 'pemenang');`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" DROP DEFAULT;`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" TYPE "ideas_status_enum" USING "status"::"text"::"ideas_status_enum";`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" SET DEFAULT 'peserta';`,
    );
    await queryRunner.query(`DROP TYPE "ideas_status_enum_old";`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."ideas_status_enum" RENAME TO "ideas_status_enum_old";`,
    );
    await queryRunner.query(
      `CREATE TYPE "ideas_status_enum" AS ENUM('peserta', 'finalis', 'pemenang');`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" DROP DEFAULT;`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" TYPE "ideas_status_enum" USING "status"::"text"::"ideas_status_enum";`,
    );
    await queryRunner.query(
      `ALTER TABLE "ideas" ALTER COLUMN "status" SET DEFAULT 'peserta';`,
    );
    await queryRunner.query(`DROP TYPE "ideas_status_enum_old";`);
  }
}
