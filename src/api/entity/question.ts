import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true }) deletedAt: Date;
  @Column("uuid") userId: string;
  @Column("uuid") channelId: string;
  @Column("text") question: string;
}

export type QuestionInput = Omit<
  Question,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
