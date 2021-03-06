import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Question, QuestionInput, User} from '../entity';

@Service()
export default class QuestionService {
  private repository!: Repository<Question>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Question);
  }

  async getLatest(): Promise<Question[]> {
    return this.repository
      .createQueryBuilder('Question')
      .loadRelationCountAndMap(
        'Question.comments',
        'Question.comments',
        'comments',
      )
      .loadRelationCountAndMap(
        'Question.likes',
        'Question.likes',
        'likes',
        (qb) => qb.andWhere('likes.isLike = :isLike', {isLike: true}),
      )
      .leftJoinAndSelect('Question.user', 'user')
      .leftJoinAndSelect('Question.channel', 'channel')
      .orderBy('Question.created_at', 'DESC')
      .limit(3)
      .getMany();
  }

  async getByChannel(
    channelId: string,
    limit: number,
    offset: number,
    keyword: string,
  ): Promise<[Question[], number]> {
    return this.repository
      .createQueryBuilder('Question')
      .where('channel_id = :channelId', {
        channelId,
      })
      .andWhere('content ILIKE :keyword', {keyword: `%${keyword}%`})
      .loadRelationCountAndMap(
        'Question.comments',
        'Question.comments',
        'comments',
      )
      .loadRelationCountAndMap(
        'Question.likes',
        'Question.likes',
        'likes',
        (qb) => qb.andWhere('likes.isLike = :isLike', {isLike: true}),
      )
      .leftJoinAndSelect('Question.user', 'user')
      .orderBy('Question.created_at', 'DESC')
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  }

  async getById(id: string): Promise<Question | undefined> {
    return this.repository
      .createQueryBuilder('Question')
      .where('Question.id = :id', {
        id,
      })
      .loadRelationCountAndMap(
        'Question.comments',
        'Question.comments',
        'comments',
      )
      .loadRelationCountAndMap(
        'Question.likes',
        'Question.likes',
        'likes',
        (qb) => qb.andWhere('likes.isLike = :isLike', {isLike: true}),
      )
      .leftJoinAndSelect('Question.channel', 'channel')
      .leftJoinAndSelect('Question.user', 'user')
      .getOne();
  }

  async store(question: Partial<Question>): Promise<Question> {
    return this.repository.save(question);
  }

  async update(
    id: string,
    question: Partial<QuestionInput>,
    user: Partial<User>,
  ): Promise<Question | undefined> {
    const userQ = await this.repository.findOne({
      id: id,
      user: user,
    });

    if (!userQ) {
      return undefined;
    }

    const {raw} = await this.repository
      .createQueryBuilder()
      .update(Question)
      .set(question)
      .where('id = :id', {id})
      .returning('*')
      .execute();
    return raw[0];
  }
}
