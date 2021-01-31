import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Event} from '../entity';
import {CommonQueryString} from '../../libs/types';

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

  async getAll(queryString: CommonQueryString): Promise<[Event[], number]> {
    const {limit, offset, sort} = queryString;
    let query = this.repository.createQueryBuilder('events');
    query.addSelect('start_date > now() as is_active');
    if (sort) {
      if (sort.startsWith('-')) {
        query = query.orderBy('events.title', 'DESC');
      } else {
        query = query.orderBy('events.title', 'ASC');
      }
    } else {
      query.addOrderBy('is_active', 'DESC');
      query.addOrderBy('events.start_date', 'ASC');
    }
    return query.offset(offset).limit(limit).getManyAndCount();
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
