import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column("uuid")
  channelId: string;

  @Column("text")
  question: string;

  @ManyToOne(() => User)
  user: User;
}

export type QuestionInput = Omit<
  Question,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
