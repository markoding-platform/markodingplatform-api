import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Admin, AdminInput } from "../entity";

@Service()
export default class AdminService {
  private repository!: Repository<Admin>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Admin);
  }

  async store(admin: Partial<AdminInput>): Promise<Admin> {
    return this.repository.save(admin);
  }

  async getById(id: number): Promise<Admin | undefined> {
    return this.repository.findOne({ id });
  }
}
