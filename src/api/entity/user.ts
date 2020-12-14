import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  externalId: string;

  @Column({ default: false })
  isEmailVerified: boolean;
}

export type UserInput = Omit<User, "id">;

export type UserResponse = Partial<User>;
