import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { SolutionType } from "../../libs/types";

@Entity("ideas")
export class Idea {
  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true }) deletedAt: Date;
  @Column("uuid") schoolId: string;
  @Column("uuid") teacherId: string;
  @Column("text") solutionName: string;
  @Column("char", { length: 6 }) solutionType: SolutionType;
  @Column("varchar", { length: 255 }) problemArea: string;
  @Column("text") problemSelection: string;
  @Column("text") problemReasoning: string;
  @Column("text") solutionVision: string;
  @Column("text") solutionMission: string;
  @Column("text") solutionBenefit: string;
  @Column("text") solutionObstacle: string;
  @Column("varchar", { length: 255 }) solutionPitchUrl: string;
  @Column("text") targetOutcomes: string;
  @Column("text") targetCustomer: string;
  @Column("text") potentialCollaboration: string;
  @Column("simple-array") solutionSupportingPhotos: string[];
  @Column("bool") isDraft: boolean;
}

export type IdeaInput = Omit<
  Idea,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
