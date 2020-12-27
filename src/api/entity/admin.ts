import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: Role;

  @Column()
  password: string;
}

enum Role {
  Operator,
  Admin,
}

export type AdminInput = Omit<Admin, "id">;

export type AdminResponse = Partial<Admin>;
