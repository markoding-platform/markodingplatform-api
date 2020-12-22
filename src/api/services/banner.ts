import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Banner, BannerInput } from "../entity";

@Service()
export default class BannerService {
  private repository!: Repository<Banner>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Banner);
  }

  async getById(id: string): Promise<Banner | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(): Promise<Banner[]> {
    return this.repository.find();
  }

  async store(banner: Partial<Banner>): Promise<Banner> {
    return this.repository.save(banner);
  }

  async update(id: string, banner: Partial<BannerInput>): Promise<Banner> {
    const { raw } = await this.repository
      .createQueryBuilder()
      .update(Banner)
      .set(banner)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return raw[0];
  }
}
