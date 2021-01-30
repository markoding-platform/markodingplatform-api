import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Idea, IdeaInput, IdeaProblemArea, IdeaResponse} from '../entity';
import {IdeaQueryString} from '../../libs/types';

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
      .leftJoinAndSelect('ideas.problemArea', 'problemArea')
      .loadRelationCountAndMap('ideas.totalLikes', 'ideas.likes')
      .loadRelationCountAndMap('ideas.totalComments', 'ideas.comments')
      .getOne();

    return result as IdeaResponse;
  }

  async getAll(queryString: IdeaQueryString): Promise<[Idea[], number]> {
    const {limit, offset, sort, solutionType, problemAreaId} = queryString;
    let query = this.repository
      .createQueryBuilder('ideas')
      .where('is_draft = false');

    if (solutionType) {
      query = query.andWhere(`ideas.solution_type IN (:...solutionType)`, {
        solutionType: solutionType.split(','),
      });
    }

    if (problemAreaId) {
      query = query.andWhere(`ideas.problem_area_id IN (:...problemAreaId)`, {
        problemAreaId: problemAreaId.split(','),
      });
    }

    if (sort) {
      if (sort.startsWith('-')) {
        query = query.orderBy('ideas.solution_name', 'DESC');
      } else {
        query = query.orderBy('ideas.solution_name', 'ASC');
      }
    }

    return query
      .limit(limit)
      .offset(offset)
      .leftJoinAndSelect('ideas.problemArea', 'problemArea')
      .loadRelationCountAndMap('ideas.totalLikes', 'ideas.likes')
      .loadRelationCountAndMap('ideas.totalComments', 'ideas.comments')
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

  async getSearch(keyword: string): Promise<Idea[]> {
    return this.repository
      .createQueryBuilder('ideas')
      .where('is_draft = false')
      .andWhere('solution_name ILIKE :keyword', {keyword: `%${keyword}%`})
      .limit(5)
      .getMany();
  }
}

@Service()
export class IdeaProblemAreaService {
  private repository!: Repository<IdeaProblemArea>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(IdeaProblemArea);
  }

  async getAll(): Promise<IdeaProblemArea[]> {
    return this.repository.find();
  }
}
