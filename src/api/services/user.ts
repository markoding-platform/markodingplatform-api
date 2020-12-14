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
    let user = await this.repository.findOne({
      name: data.name,
      email: data.email,
      externalId: data.externalId,
    });

    if (!user) {
      user = await this.repository.save({
        ...data,
        isEmailVerified: false,
      });
    }

    if (!user?.isEmailVerified && data.isEmailVerified) {
      await this.repository.update(
        {
          id: user.id,
        },
        {
          isEmailVerified: true,
        }
      );

      user = {
        ...user,
        isEmailVerified: true,
      };
    }

    return user;
  }
}

export default UserService;
