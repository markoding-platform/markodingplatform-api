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

import {Profile, UserPoint} from '.';

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

  @Column({type: 'bigint', default: 0})
  skilvulPoint: number;

  @Column({type: 'bigint', default: 0})
  markodingPoint: number;

  @OneToMany(() => UserPoint, (point) => point.user)
  points: UserPoint[];
}

export type UserInput = Omit<
  User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'skilvulPoint'
  | 'markodingPoint'
  | 'points'
>;

export type UserUpdateInput = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'points'
>;

export type UserResponse = Partial<User>;
