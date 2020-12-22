import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
