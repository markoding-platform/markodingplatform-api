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
import { Question } from "./question";

@Entity("questionComments")
export class QuestionComment {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column("text")
  content: string;

  @ManyToOne(() => Question, (question) => question.comments)
  question: Question;

  @ManyToOne(() => User)
  user: User;
}

export type QuestionCommentInput = Omit<
  QuestionComment,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
