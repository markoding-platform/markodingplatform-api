import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Question, QuestionInput } from "../entity";

@Service()
export default class QuestionService {
  private repository!: Repository<Question>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Question);
  }

  async getById(id: string): Promise<Question | undefined> {
    return this.repository
      .createQueryBuilder()
      .where("Question.id = :id", {
        id,
      })
      .leftJoinAndSelect("Question.user", "user")
      .getOne();
  }

  async getByChannel(channelId: string): Promise<Question[]> {
    return this.repository
      .createQueryBuilder()
      .where("channel_id = :channelId", {
        channelId,
      })
      .leftJoinAndSelect("Question.user", "user")
      .getMany();
  }

  async store(question: Partial<Question>): Promise<Question> {
    return this.repository.save(question);
  }

  async update(
    id: string,
    question: Partial<QuestionInput>
  ): Promise<Question> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .update(Question)
      .set(question)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return raw[0];
  }
}
