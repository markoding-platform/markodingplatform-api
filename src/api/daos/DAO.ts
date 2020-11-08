import { Connection } from 'typeorm'

class DAO {
  protected db: Connection

  constructor (db: Connection) {
    this.db = db
  }
}

export default DAO
