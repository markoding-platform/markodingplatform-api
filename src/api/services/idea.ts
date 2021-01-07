import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Idea, IdeaInput} from '../entity';

@Service()
export default class IdeaService {
  private repository!: Repository<Idea>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Idea);
  }

  async getOne(idea: Partial<Idea>): Promise<Idea | undefined> {
    return this.repository.findOne(idea);
  }

  async getAll(): Promise<Idea[]> {
    return this.repository.find({isDraft: false});
  }

  async store(idea: Partial<Idea>): Promise<Idea> {
    return this.repository.save(idea);
  }

  async update(id: string, idea: Partial<IdeaInput>): Promise<Idea> {
    const {raw} = await this.repository
      .createQueryBuilder()
      .update(Idea)
      .set(idea)
      .where('id = :id', {id})
      .returning('*')
      .execute();
    return raw[0];
  }
}
