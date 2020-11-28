import { Initializer, Service } from "fastify-decorators";
import { createConnection, Connection } from "typeorm";

import { User, Idea } from "../api/entity";

@Service()
export default class Database {
  private _connection!: Connection;

  public get connection(): Connection {
    return this._connection;
  }

  @Initializer()
  async init(): Promise<void> {
    this._connection = await createConnection({
      name: "connection-1",
      type: "postgres",
      host: "d-markoding-postgres",
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Idea],
      logging: true,
      synchronize: true,
    });
  }
}
