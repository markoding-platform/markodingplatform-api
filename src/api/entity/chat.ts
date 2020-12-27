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
import { ChatType } from "../../libs/types";

@Entity("chats")
export class Chat {
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

  @Column("char", { length: 5 })
  type: ChatType;

  @ManyToOne(() => User)
  user: User;
}

export type ChatInput = Omit<
  Chat,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
