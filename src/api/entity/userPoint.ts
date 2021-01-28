import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import {User} from '.';

@Entity('user_points')
export class UserPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column({type: 'varchar'})
  activityType: string;

  @Column({type: 'text'})
  activityText: string;

  @Column({type: 'bigint'}) // prevent negative value
  point: number;

  @ManyToOne(() => User, (user) => user.points)
  user: User;
}
