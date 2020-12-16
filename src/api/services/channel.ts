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

  async getAll(): Promise<Event[]> {
    return this.repository.find();
  }

  async store(event: Partial<Event>): Promise<Event> {
    return this.repository.save(event);
  }
}
