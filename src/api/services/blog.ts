import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Blog} from '../entity';
import {CommonQueryString} from '../../libs/types';

@Service()
export default class BlogService {
  private repository!: Repository<Blog>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Blog);
  }

  async getById(id: string): Promise<Blog | undefined> {
    return this.repository.findOne({id});
  }

  async getAll(queryString: CommonQueryString): Promise<[Blog[], number]> {
    const {limit, offset, sort} = queryString;
    const query = this.repository.createQueryBuilder('blogs');
    const orderBy = {};

    if (sort) {
      const sorts = sort.split(',');

      sorts.forEach((s: string) => {
        if (s.startsWith('-')) {
          s = s.slice(1);
          orderBy[`blogs.${s}`] = 'DESC';
        } else {
          orderBy[`blogs.${s}`] = 'ASC';
        }
      });
    } else {
      orderBy['blogs.created_at'] = 'DESC';
    }

    return query.offset(offset).limit(limit).orderBy(orderBy).getManyAndCount();
  }

  async store(blog: Partial<Blog>): Promise<Blog> {
    return this.repository.save(blog);
  }
}
