import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import {Profile} from './profile';

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
}

export type UserInput = Omit<User, 'id'>;

export type UserResponse = Partial<User>;
