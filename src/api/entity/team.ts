import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  ideaId: string;

  @Column("uuid")
  userId: string;

  @Column("boolean")
  isLeader: boolean;
}

export type TeamInput = Omit<Team, "id">;

export interface TeamInputMany {
  ideaId: string;
  leaderId: string;
  userIds: string[];
}
