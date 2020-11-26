import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm'
import Database from '../../config/database'
import Idea from '../../entity/Idea'

@Service()
export default class IdeaService {
  private repository!: Repository<Idea>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Idea)
  }

  async getOneById(id: number): Promise<Idea | undefined> {
    // @ts-ignore
    return this.repository.findOne({ id })
  }

  async getAll(): Promise<Idea[]> {
    return this.repository.find()
  }

  async createOne(data: Idea): Promise<Idea> {
    return this.repository.save(data)
  }
}
