import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {User, Channel, QuestionComment, QuestionLike} from '.';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('text')
  content: string;

  @ManyToOne(() => Channel)
  channel: Channel;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => QuestionComment, (comment) => comment.question)
  comments: QuestionComment[];

  @OneToMany(() => QuestionLike, (like) => like.question)
  likes: QuestionLike[];
}

export type QuestionInput = Omit<
  Question,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
