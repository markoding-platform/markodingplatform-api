import { Initializer, Service } from 'fastify-decorators';
import { Repository } from 'typeorm'
import ConnectionService from '../../config/database'
import Idea from '../../entity/Idea'

@Service()
export class IdeaService {
  private repository!: Repository<Idea>;
  constructor(private connectionService: ConnectionService) {}

  @Initializer([ConnectionService])
  async init(): Promise<void> {
    this.repository = this.connectionService.connection.getRepository(Idea)
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
