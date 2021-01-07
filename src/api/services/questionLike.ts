import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {QuestionLike, QuestionLikeInput} from '../entity';

@Service()
export default class QuestionLikeService {
  private repository!: Repository<QuestionLike>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(QuestionLike);
  }

  async updateOrStore(data: Partial<QuestionLikeInput>): Promise<QuestionLike> {
    const liked = await this.repository.findOne({
      question: data.question,
      user: data.user,
    });
    if (liked) {
      const {raw} = await this.repository
        .createQueryBuilder()
        .update(QuestionLike)
        .set({isLike: !liked.isLike})
        .where('id = :id', {id: liked.id})
        .returning('*')
        .execute();
      return raw[0];
    }
    return this.repository.save(data);
  }
}
