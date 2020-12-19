import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { User, Question } from ".";

@Entity("questionLikes")
export class QuestionLike {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({ type: "boolean", default: () => false })
  isLike: boolean;

  @ManyToOne(() => Question, (question: Question) => question.likes)
  question: Question;

  @ManyToOne(() => User)
  user: User;
}

export type QuestionLikeInput = Omit<
  QuestionLike,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
