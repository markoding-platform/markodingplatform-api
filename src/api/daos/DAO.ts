import { Connection } from 'typeorm'

class DAO<T = object> {
  protected db: Connection

  constructor (db: Connection) {
    this.db = db
  }
}

export default DAO
