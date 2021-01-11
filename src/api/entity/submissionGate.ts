import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import {User} from '.';

@Entity('submission_gates')
export class SubmissionGate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @Column({type: 'boolean', default: false})
  isClosed: boolean;

  @ManyToOne(() => User, (user) => user.submissionGates)
  @JoinColumn({name: 'created_by'})
  createdBy: User;
}
