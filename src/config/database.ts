import { Initializer, Service } from 'fastify-decorators'
import { createConnection, Connection } from 'typeorm'

import User from '../entity/User'
import Idea from '../entity/Idea'

@Service()
export default class Database {
  connection!: Connection;

  @Initializer()
  async init(): Promise<void> {
    // @ts-ignore
    this._connection = await createConnection({
      name: 'connection-1',
      type: 'postgres',
      host: 'd-markoding-postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Idea],
      logging: true,
      synchronize: true
    }).then((conn: Connection): Connection => {
      console.log('connection to db is established')
      return conn
    }).catch((error) => {
      console.log('failed connecting to db')
      console.log(error)
    })
  }
}
