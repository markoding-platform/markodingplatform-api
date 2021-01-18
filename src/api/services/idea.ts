import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Idea, IdeaInput, IdeaResponse} from '../entity';
import {OrderQuery, SolutionType} from '../../libs/types';

@Service()
export default class IdeaService {
  private repository!: Repository<Idea>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Idea);
  }

  async getOne(idea: Partial<Idea>): Promise<IdeaResponse | undefined> {
    const result = await this.repository
      .createQueryBuilder('ideas')
      .where('ideas.id = :id', idea)
      .leftJoinAndSelect('ideas.comments', 'comments')
      .loadRelationCountAndMap('ideas.totalLikes', 'ideas.likes')
      .loadRelationCountAndMap('ideas.totalComments', 'ideas.comments')
      .getOne();

    return result as IdeaResponse;
  }

  async getAll(
    limit: number,
    offset: number,
    order: OrderQuery,
    solutionType: SolutionType | undefined,
  ): Promise<[Idea[], number]> {
    let query = this.repository.createQueryBuilder('ideas');

    if (solutionType)
      query = query.where('solution_type = :solutionType', {solutionType});
    if (order) query = query.orderBy(order);

    return query
      .limit(limit)
      .offset(offset)
      .orderBy(order)
      .loadRelationCountAndMap('ideas.totalLikes', 'ideas.likes', 'total_likes')
      .loadRelationCountAndMap(
        'ideas.totalComments',
        'ideas.comments',
        'total_comments',
      )
      .getManyAndCount();
  }

  async store(idea: Partial<IdeaInput>): Promise<Idea> {
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
