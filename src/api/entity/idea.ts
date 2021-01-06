import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { IdeaLike } from ".";

import { SolutionType } from "../../libs/types";

@Entity("ideas")
export class Idea {
  @PrimaryGeneratedColumn("uuid") id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column("varchar", { length: 255 }) schoolId: string;
  @Column("text") schoolName: string;
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
  @Column("varchar", { length: 255, nullable: true }) solutionPitchUrl: string;
  @Column("text") targetOutcomes: string;
  @Column("text") targetCustomer: string;
  @Column("text", { nullable: true }) potentialCollaboration: string;
  @Column("simple-array", { nullable: true })
  solutionSupportingPhotos: string[];
  @Column("bool") isDraft: boolean;

  @OneToMany(() => IdeaLike, (like: IdeaLike) => like.idea)
  likes: IdeaLike[];
}

export type IdeaInput = Omit<
  Idea,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
