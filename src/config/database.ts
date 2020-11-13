import { createConnection } from 'typeorm'

import User from '../models/User'
import Idea from '../models/Idea'

createConnection({
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
})
  .then(() => console.log('connection to db is established'))
  .catch((error) => {
    console.log('failed connecting to db')
    console.log(error)
  })
