import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Event } from "../entity";

@Service()
export default class EventService {
  private repository!: Repository<Event>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Event);
  }

  async getById(id: string): Promise<Event | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(offset: number, limit: number): Promise<Event[]> {
    return this.repository
      .createQueryBuilder()
      .offset(offset)
      .limit(limit)
      .orderBy("date", "ASC")
      .getMany();
  }

  async store(event: Partial<Event>): Promise<Event> {
    return this.repository.save(event);
  }
}
