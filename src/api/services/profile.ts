import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Profile, ProfileInput } from "../entity";

@Service()
export default class ProfileService {
  private repository!: Repository<Profile>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Profile);
  }

  async getById(id: string): Promise<Profile | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(): Promise<Profile[]> {
    return this.repository.find();
  }

  async store(idea: Partial<Profile>): Promise<Profile> {
    return this.repository.save(idea);
  }

  async update(id: string, idea: Partial<ProfileInput>): Promise<Profile> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .update(Profile)
      .set(idea)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return raw[0];
  }
}
