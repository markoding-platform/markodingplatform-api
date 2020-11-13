import DAO from './DAO'
import Idea from '../../models/Idea'
import { FindManyOptions } from 'typeorm'

class IdeaDAO extends DAO<Idea> {
  async getOneById(id: number): Promise<Idea | undefined> {
    return this.db.getRepository(Idea).findOne(id)
  }

  async getMany(params: FindManyOptions): Promise<Idea[]> {
    return this.db.getRepository(Idea).find(params)
  }

  async createOne(data: Idea): Promise<Idea> {
    return this.db.getRepository(Idea).save(data)
  }
}

export default IdeaDAO
