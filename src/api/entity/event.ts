import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("text")
  description: string;

  @Column("date")
  date: Date;

  @Column("time")
  start: string;

  @Column("time")
  finish: string;
}

export type EventInput = Omit<Event, "id">;
