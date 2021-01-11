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

@Entity('idea_teams')
export class IdeaTeam {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('boolean', {default: false}) isLeader: boolean;

  @ManyToOne(() => Idea, (idea: Idea) => idea.teams)
  idea: Idea;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export type IdeaTeamInput = Omit<
  IdeaTeam,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type IdeaTeamPayload = {
  ideaId: string;
  userIds: [string, string];
};

export type AddToTeamInput = {
  userId: string;
  isLeader: boolean;
};
