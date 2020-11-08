import { Connection, FindManyOptions } from 'typeorm'

abstract class DAO<T = any> {
  protected db: Connection

  constructor (db: Connection) {
    this.db = db
  }

  abstract async getMany (params?: FindManyOptions): Promise<T[]>
  abstract async getOneById (id: number): Promise<T | undefined>
  abstract async createOne (data: T): Promise<T>
}

export default DAO
