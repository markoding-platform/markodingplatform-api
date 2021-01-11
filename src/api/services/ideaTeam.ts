import {Initializer, Service} from 'fastify-decorators';
import {Repository} from 'typeorm';

import Database from '../../config/database';
import {Idea, IdeaTeam, IdeaTeamInput} from '../entity';

@Service()
export default class IdeaTeamService {
  private repository!: Repository<IdeaTeam>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(IdeaTeam);
  }

  async getOne(team: Partial<IdeaTeam>): Promise<IdeaTeam | undefined> {
    return this.repository.findOne(team, {
      relations: ['idea', 'user'],
    });
  }

  async getAllByIdea(idea: Idea): Promise<IdeaTeam[] | undefined> {
    return this.repository.find({
      where: {idea},
      relations: ['idea', 'user'],
    });
  }

  async store(teams: IdeaTeamInput[]): Promise<IdeaTeam[]> {
    return this.repository.save(teams);
  }

  async addToTeam(payload: IdeaTeamInput): Promise<IdeaTeam> {
    return this.repository.save(payload);
  }
}
