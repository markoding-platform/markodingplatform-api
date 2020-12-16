import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Channel } from "../entity";

@Service()
export default class ChannelService {
  private repository!: Repository<Channel>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Channel);
  }

  async getById(id: string): Promise<Channel | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(): Promise<Channel[]> {
    return this.repository.find();
  }
}
