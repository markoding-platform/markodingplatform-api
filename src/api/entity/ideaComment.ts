import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {User, Idea} from '.';

@Entity('idea_comments')
export class IdeaComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column({type: 'text'})
  comment: string;

  @ManyToOne(() => Idea, (idea: Idea) => idea.likes)
  idea: Idea;

  @ManyToOne(() => User)
  user: User;
}
