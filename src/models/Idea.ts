import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class Idea {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  teamId: string

  @Column("varchar")
  problem: string

  @Column("text")
  solution: string

  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  vote: number
}

export default Idea