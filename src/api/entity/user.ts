import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import {Profile, SubmissionGate} from '.';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Index()
  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  externalId: string;

  @Column({default: false})
  isEmailVerified: boolean;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;

  @OneToMany(
    () => SubmissionGate,
    (submissionGate) => submissionGate.createdBy,
    {nullable: true},
  )
  submissionGates?: SubmissionGate[];
}

export type UserInput = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UserResponse = Partial<User>;
