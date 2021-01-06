import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true}) deletedAt: Date;
  @Column('uuid') ideaId: string;
  @Column('uuid') userId: string;
  @Column('boolean', {default: false}) isLeader: boolean;
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
