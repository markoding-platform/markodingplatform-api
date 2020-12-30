import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Student } from "./student";

export type UserType = "teacher" | "student" | "mentor";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  externalId: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({
    type: "enum",
    enum: ["teacher", "student", "mentor"],
    nullable: true,
  })
  type?: UserType;

  @OneToMany(() => Student, (student) => student.user)
  student: Student[];
}

export type UserInput = Omit<User, "id">;

export type UserResponse = Partial<User>;
