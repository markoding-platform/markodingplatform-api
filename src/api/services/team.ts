import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";

import Database from "../../config/database";
import { Team, TeamInput } from "../entity";

@Service()
export default class TeamService {
  private repository!: Repository<Team>;
  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Team);
  }

  async getById(ideaId: string): Promise<Team[] | undefined> {
    return this.repository
      .createQueryBuilder("team")
      .where("idea_id = :ideaId", { ideaId })
      .getMany();
  }

  async store(teams: TeamInput[]): Promise<Team[]> {
    const { generatedMaps } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values(teams)
      .returning("*")
      .execute();
    return generatedMaps as Team[];
  }

  async addToTeam(payload: TeamInput): Promise<Team> {
    return this.repository.save(payload);
  }
}
