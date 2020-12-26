import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  userId: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", { length: 255 })
  imageUrl: string;

  @Column("date")
  date: Date;

  @Column("time")
  start: string;

  @Column("time")
  finish: string;
}

export type BlogInput = Omit<Blog, "id">;
