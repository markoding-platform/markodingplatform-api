import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("blogs")
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", { length: 255 })
  imageUrl: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
}

export type BlogInput = Omit<
  Blog,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
