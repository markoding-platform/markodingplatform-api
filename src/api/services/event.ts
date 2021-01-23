import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Event, Idea} from '../entity';

@Service()
export default class EventService {
  private repository!: Repository<Event>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Event);
  }

  async getById(id: string): Promise<Event | undefined> {
    return this.repository.findOne({id});
  }

  async getAll(offset: number, limit: number): Promise<Event[]> {
    return this.repository
      .createQueryBuilder()
      .offset(offset)
      .limit(limit)
      .orderBy('start_date', 'ASC')
      .getMany();
  }

  async store(event: Partial<Event>): Promise<Event> {
    return this.repository.save(event);
  }

  async getSearch(keyword: string): Promise<Event[]> {
    return this.repository
      .createQueryBuilder()
      .where('title ILIKE :keyword', {keyword: `%${keyword}%`})
      .limit(5)
      .getMany();
  }
}
