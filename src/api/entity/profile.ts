import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { ProfileType } from "../../libs/types/index";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({
    type: "enum",
    enum: ["student", "teacher", "mentor", "supporter"],
    default: "student",
  })
  profileType: ProfileType;

  @Column({ type: "varchar", nullable: true })
  schoolId: string;
  @Column({ type: "varchar", nullable: true })
  schoolName: string;
  @Column({ type: "varchar", nullable: true })
  schoolTypeId: string;
  @Column({ type: "varchar", nullable: true })
  schoolTypeName: string;
  @Column({ type: "varchar", nullable: true })
  schoolGradeId: string;
  @Column({ type: "varchar", nullable: true })
  schoolGradeName: string;
  @Column({ type: "varchar", nullable: true })
  classId: string;
  @Column({ type: "varchar", nullable: true })
  className: string;

  @Column({ type: "varchar", nullable: true })
  cityId: string;
  @Column({ type: "varchar", nullable: true })
  cityName: string;
  @Column({ type: "varchar", nullable: true })
  provinceId: string;
  @Column({ type: "varchar", nullable: true })
  provinceName: string;

  @Column({ type: "varchar", nullable: true })
  workingPosition: string;
  @Column({ type: "varchar", nullable: true })
  companyName: string;
  @Column({ type: "varchar", nullable: true })
  expertise: string;

  @Column({ type: "integer", nullable: true })
  startTeachingYear: number;

  @Column({ type: "varchar", nullable: true })
  lastEducationGradeId: string;
  @Column({ type: "varchar", nullable: true })
  lastEducationGradeName: string;
}

export type ProfileInput = Omit<
  Profile,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
