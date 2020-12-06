require("dotenv").config();

import { Seeder, Factory } from "typeorm-seeding";

import { Idea } from "../../api/entity";

export default class CreateIdeas implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Idea)().createMany(10);
  }
}
