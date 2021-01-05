import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {QuestionComment, QuestionCommentInput} from '../entity';

@Service()
export default class QuestionCommentService {
  private repository!: Repository<QuestionComment>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(QuestionComment);
  }

  async getByQuestion(
    questionId: string,
    limit: number,
    offset: number,
  ): Promise<QuestionComment[]> {
    return this.repository
      .createQueryBuilder('QuestionComment')
      .where('question_id = :questionId', {
        questionId,
      })
      .leftJoinAndSelect('QuestionComment.user', 'user')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async store(
    comment: Partial<QuestionCommentInput>,
  ): Promise<QuestionComment> {
    return this.repository.save(comment);
  }
}
