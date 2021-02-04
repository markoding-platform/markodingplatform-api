import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {IdeaLike, Idea, User} from '../entity';

@Service()
export default class IdeaLikeService {
  private repository!: Repository<IdeaLike>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(IdeaLike);
  }

  async storeOrDelete(idea: Idea, user: User): Promise<boolean> {
    const liked = await this.repository.find({
      where: {
        idea: idea.id,
        user: user.id,
      },
    });

    if (liked.length) {
      await this.repository
        .createQueryBuilder()
        .delete()
        .from(IdeaLike)
        .where('id = :id', {id: liked[0].id})
        .execute();
      return true;
    }

    const ideaLike = new IdeaLike();
    ideaLike.idea = idea;
    ideaLike.user = user;
    await this.repository.save(ideaLike);
    return false;
  }

  async getUserVote(
    ideaId: string,
    userId: string,
  ): Promise<IdeaLike | undefined> {
    return this.repository.findOne({
      where: {
        user: userId,
        idea: ideaId,
      },
    });
  }
}
