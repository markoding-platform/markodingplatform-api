import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';
import {camelCase} from 'lodash';

import Database from '../../config/database';
import {Badge} from '../entity';

@Service()
export default class BadgeService {
  private repository!: Repository<Badge>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Badge);
  }

  async store(data: Partial<Badge>): Promise<Badge> {
    return this.repository.save(data);
  }

  async updateById(
    id: string,
    data: Partial<Badge>,
  ): Promise<Badge | undefined> {
    const {raw} = await this.repository
      .createQueryBuilder()
      .update(Badge)
      .set(data)
      .where('id = :id', {id})
      .returning('*')
      .execute();

    Reflect.ownKeys(raw[0]).forEach((key) => {
      Reflect.set(raw[0], camelCase(key as string), raw[0][key]);
    });

    return raw[0];
  }

  async deleteById(id: string): Promise<Badge | undefined> {
    const toBeDeleted = await this.repository.findOne({id});

    if (!toBeDeleted) return;

    await this.repository.softDelete({id});

    return toBeDeleted;
  }

  async getById(id: string): Promise<Badge | undefined> {
    return this.repository.findOne({id});
  }

  async getManyAndCount(
    skip = 0,
    limit = 10,
    keyword?: string,
  ): Promise<{items: Badge[]; count: number}> {
    let query = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .limit(limit);

    if (keyword) {
      query = query.where('name ILIKE :keyword', {keyword: `%${keyword}%`});
    }

    const [items, count] = await query.getManyAndCount();

    return {items, count};
  }
}
