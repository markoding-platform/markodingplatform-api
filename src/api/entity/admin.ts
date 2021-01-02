import { Entity, PrimaryGeneratedColumn, Column,
CreateDateColumn,
UpdateDateColumn,
DeleteDateColumn,
} from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("varchar", { length: 255 })
  role: Role;

  @Column("text")
  password: string;
}

enum Role {
  Operator,
  Admin,
}

export type AdminInput = Omit<Admin, "id">;

export type AdminResponse = Partial<Admin>;
