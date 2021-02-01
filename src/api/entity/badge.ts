import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('varchar')
  name: string;

  @Column('varchar')
  pictureUrl: string;
}

export type BadgeInput = Omit<
  Badge,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
