import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {IdeaComment, Idea, User} from '../entity';

@Service()
export default class IdeaCommentService {
  private repository!: Repository<IdeaComment>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(IdeaComment);
  }

  async store(idea: Idea, user: User, comment: string): Promise<void> {
    const ideaComment = new IdeaComment();
    ideaComment.idea = idea;
    ideaComment.user = user;
    ideaComment.comment = comment;
    await this.repository.save(ideaComment);
    return;
  }
}
