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

  @Column("varchar")
  schoolId: string;
  @Column("varchar")
  schoolName: string;
  @Column("varchar")
  schoolTypeId: string;
  @Column("varchar")
  schoolTypeName: string;
  @Column("varchar")
  schoolGradeId: string;
  @Column("varchar")
  schoolGradeName: string;
  @Column("varchar")
  classId: string;
  @Column("varchar")
  className: string;

  @Column("varchar")
  cityId: string;
  @Column("varchar")
  cityName: string;
  @Column("varchar")
  provinceId: string;
  @Column("varchar")
  provinceName: string;

  @Column("varchar")
  workingPosition: string;
  @Column("varchar")
  companyName: string;
  @Column("varchar")
  expertise: string;

  @Column("integer")
  startTeachingYear: number;

  @Column("varchar")
  lastEducationGradeId: string;
  @Column("varchar")
  lastEducationGradeName: string;
}

export type ProfileInput = Omit<
  Profile,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
