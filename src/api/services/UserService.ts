import Service from './Service'
import User from '../../models/User'

class UserService extends Service {
  async getOneUserById (id: number): Promise<User | undefined> {
    return this.dao.getOneById(id)
  }

  async getAllUsers (): Promise<User[]> {
    return this.dao.getMany()
  }

  async createUser (data: User): Promise<User> {
    return this.dao.createOne(data)
  }
}

export default UserService
