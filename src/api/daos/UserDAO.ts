import DAO from './DAO'
import User from '../../models/User'
import { FindManyOptions } from 'typeorm'

class UserDAO extends DAO<User> {
  async getOneById (id: number): Promise<User | undefined> {
    const user = await this.db.getRepository(User)
      .findOne(id)

    console.log(user)

    return user
  }

  getMany (params: FindManyOptions): Promise<User[]> {
    return this.db.getRepository(User)
      .find(params)
  }

  async createOne (data: User): Promise<User> {
    return this.db.getRepository(User)
      .create(data)
  }
}

export default UserDAO
