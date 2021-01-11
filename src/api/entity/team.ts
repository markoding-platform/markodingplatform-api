import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {Idea, User} from '.';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('boolean', {default: false}) isLeader: boolean;

  @OneToOne(() => Idea)
  @JoinColumn()
  idea: Idea;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export type TeamInput = Omit<
  Team,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type TeamPayload = {
  ideaId: string;
  userIds: [string, string];
};

export type AddToTeamInput = {
  userId: string;
  isLeader: boolean;
};
