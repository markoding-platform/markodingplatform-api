import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { User, UserInput } from "../entity";

@Service()
class UserService {
  private repository!: Repository<User>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(User);
  }

  async findOrCreate(data: UserInput): Promise<User> {
    let user = await this.repository.findOne(data);

    if (!user) {
      user = await this.repository.create(data);
    }

    return user;
  }
}

export default UserService;
