import Service from './Service'
import Idea from '../../models/Idea'

class IdeaService extends Service {
  async getOneIdeaById(id: number): Promise<Idea | undefined> {
    return this.dao.getOneById(id)
  }

  async getAllIdeas(): Promise<Idea[]> {
    return this.dao.getMany()
  }

  async createIdea(data: Idea): Promise<Idea> {
    return this.dao.createOne(data)
  }
}

export default IdeaService