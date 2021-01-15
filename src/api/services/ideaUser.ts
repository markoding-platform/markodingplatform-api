import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Idea, IdeaUser, IdeaUserInput, User} from '../entity';

@Service()
export default class IdeaUserService {
  private repository!: Repository<IdeaUser>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(IdeaUser);
  }

  async getOne(team: Partial<IdeaUser>): Promise<IdeaUser | undefined> {
    return this.repository.findOne(team);
  }

  async getIdeaByUser(user: User): Promise<IdeaUser | undefined> {
    return this.repository.findOne({
      where: {user},
      join: {
        alias: 'ideaUser',
        leftJoinAndSelect: {
          idea: 'ideaUser.idea',
        },
      },
    });
  }

  async getAllUsersByIdea(idea: Idea): Promise<IdeaUser[] | undefined> {
    return this.repository.find({
      where: {idea},
      join: {
        alias: 'ideaUser',
        leftJoinAndSelect: {
          idea: 'ideaUser.idea',
          user: 'ideaUser.user',
          profile: 'user.profile',
        },
      },
    });
  }

  async store(teams: IdeaUserInput[]): Promise<IdeaUser[]> {
    return this.repository.save(teams);
  }

  async addToTeam(payload: IdeaUserInput): Promise<IdeaUser> {
    return this.repository.save(payload);
  }
}
