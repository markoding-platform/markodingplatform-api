import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Blog } from "../entity";

@Service()
export default class BlogService {
  private repository!: Repository<Blog>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Blog);
  }

  async getById(id: string): Promise<Blog | undefined> {
    return this.repository.findOne({ id });
  }

  async getAll(): Promise<Blog[]> {
    return this.repository.find();
  }

  async store(blog: Partial<Blog>): Promise<Blog> {
    return this.repository.save(blog);
  }
}
