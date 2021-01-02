import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column("text")
  title: string;

  @Column("varchar", { length: 255 })
  imageUrl: string;

  @Column("varchar", { length: 255 })
  link: string;

  @Column("smallint")
  sort: number;

  @Column("bool")
  isActive: boolean;

  @Column("timestamp")
  startAt: Date;

  @Column("timestamp")
  endAt: Date;
}

export type BannerInput = Omit<Banner, "id">;
