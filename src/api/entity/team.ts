import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true }) deletedAt: Date;
  @Column("uuid") ideaId: string;
  @Column("uuid") userId: string;
  @Column("boolean") isLeader: boolean;
}

export type TeamInput = Omit<
  Team,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export interface TeamInputMany {
  ideaId: string;
  leaderId: string;
  userIds: string[];
}

export interface AddToTeamInput {
  userId: string;
  isLeader: boolean;
}
