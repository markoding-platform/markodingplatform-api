import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {Idea, User} from '.';

@Entity('idea_users')
export class IdeaUser {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('boolean', {default: false}) isLeader: boolean;

  @ManyToOne(() => Idea, (idea: Idea) => idea.users)
  idea: Idea;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export type IdeaUserInput = Omit<
  IdeaUser,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type IdeaUserPayload = {
  ideaId: string;
  userIds: [string, string];
};

export type AddToTeamInput = {
  userId: string;
  isLeader: boolean;
};
