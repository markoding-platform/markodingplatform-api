import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User, Idea } from ".";

@Entity("idea_likes")
export class IdeaLike {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Idea, (idea: Idea) => idea.likes)
  idea: Idea;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
