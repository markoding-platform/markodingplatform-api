import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Announcement, AnnouncementInput } from "../entity";

@Service()
export default class AnnouncementService {
  private repository!: Repository<Announcement>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Announcement);
  }

  async getById(id: string): Promise<Announcement | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(): Promise<Announcement[]> {
    return this.repository.find();
  }

  async store(announcement: Partial<Announcement>): Promise<Announcement> {
    return this.repository.save(announcement);
  }

  async update(
    id: string,
    announcement: Partial<AnnouncementInput>
  ): Promise<Announcement> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .update(Announcement)
      .set(announcement)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return raw[0];
  }
}
