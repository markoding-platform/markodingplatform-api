import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("text")
  description: string;

  @Column("date")
  startDate: Date;

  @Column("date")
  finishDate: Date;

  @Column("time")
  startAt: string;

  @Column("time")
  finishAt: string;

  @Column("varchar", { length: 255 })
  imageUrl: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
}

export type EventInput = Omit<Event, "id">;
