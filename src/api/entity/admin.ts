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
import {User} from '.';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('varchar', {length: 255})
  name: string;

  @Column('varchar', {length: 255, unique: true})
  email: string;

  @Column('varchar', {length: 255})
  role: Role;

  @Column('text')
  password: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

enum Role {
  Operator,
  Admin,
}

export type AdminInput = Omit<Admin, 'id'>;

export type AdminResponse = Partial<Admin>;
