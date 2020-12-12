import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;
  @DeleteDateColumn({ type: "timestamp", nullable: true }) deletedAt: Date;
  @Column("varchar", { length: 255 }) title: string;
  @Column("text") subtitle: string;
  @Column("timestamp") datetime: Date;
  @Column("varchar", { length: 255 }) url: string;
  @Column("uuid", { nullable: true }) userId: Date;
}

export type AnnouncementInput = Omit<
  Announcement,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
