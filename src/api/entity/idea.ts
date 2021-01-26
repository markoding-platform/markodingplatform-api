import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import {IdeaLike, IdeaComment, IdeaUser} from '.';
import {IdeaStatus, SolutionType} from '../../libs/types';

@Entity('ideas')
export class Idea {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column({type: 'enum', enum: IdeaStatus, default: IdeaStatus.PARTICIPANT})
  status: IdeaStatus;
  @Column('varchar', {length: 255}) schoolId: string;
  @Column('text') schoolName: string;
  @Column('text') solutionName: string;
  @Column({type: 'enum', enum: SolutionType}) solutionType: SolutionType;
  @Column('text') problemSelection: string;
  @Column('text') problemReasoning: string;
  @Column('text') solutionVision: string;
  @Column('text') solutionMission: string;
  @Column('text') solutionBenefit: string;
  @Column('text') solutionObstacle: string;
  @Column('varchar', {length: 255, nullable: true}) solutionPitchUrl: string;
  @Column('text') targetOutcomes: string;
  @Column('text') targetCustomer: string;
  @Column('text', {nullable: true}) potentialCollaboration: string;
  @Column('simple-array', {nullable: true})
  solutionSupportingPhotos: string[];
  @Column('bool') isDraft: boolean;
  @Column('integer', {default: 0}) liked: number;

  @ManyToOne(() => IdeaProblemArea)
  problemArea: IdeaProblemArea;
  @OneToMany(() => IdeaUser, (user: IdeaUser) => user.idea)
  users: IdeaUser[];
  @OneToMany(() => IdeaLike, (like: IdeaLike) => like.idea)
  likes: IdeaLike[];
  @OneToMany(() => IdeaComment, (comment: IdeaComment) => comment.idea)
  comments: IdeaComment[];

  toIdea() {
    return {
      id: this.id,
      status: this.status,
      schoolId: this.schoolId,
      schoolName: this.schoolName,
      solutionType: this.solutionType,
      problemArea: this.problemArea,
      problemSelection: this.problemSelection,
      problemReasoning: this.problemReasoning,
      solutionVision: this.solutionVision,
      solutionMission: this.solutionMission,
      solutionBenefit: this.solutionBenefit,
      solutionObstacle: this.solutionObstacle,
      solutionPitchUrl: this.solutionPitchUrl,
      targetOutcomes: this.targetOutcomes,
      targetCustomer: this.targetCustomer,
      potentialCollaboration: this.potentialCollaboration,
      solutionSupportingPhotos: this.solutionSupportingPhotos,
      isDraft: this.isDraft,
      liked: this.liked,
    };
  }
}

export type IdeaInput = Omit<
  Idea,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface IdeaResponse extends Idea {
  totalLikes: number;
  totalComments: number;
}

@Entity('idea_problem_areas')
export class IdeaProblemArea {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()'})
  updatedAt: Date;
  @DeleteDateColumn({type: 'timestamp', nullable: true})
  deletedAt: Date;

  @Column('varchar', {length: 255}) problemArea: string;
}
