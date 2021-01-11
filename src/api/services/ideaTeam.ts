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
      relations: ['ideas', 'users'],
    });
  }

  async getByIdeaId(idea: Idea): Promise<IdeaTeam[] | undefined> {
    return this.repository.find({
      where: {idea},
      relations: ['idea', 'user'],
    });
  }

  async store(teams: IdeaTeamInput[]): Promise<IdeaTeam[]> {
    const {
      generatedMaps,
    } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(IdeaTeam)
      .values(teams)
      .returning('*')
      .execute();
    return generatedMaps as IdeaTeam[];
  }

  async addToIdeaTeam(payload: IdeaTeamInput): Promise<IdeaTeam> {
    return this.repository.save(payload);
  }
}
