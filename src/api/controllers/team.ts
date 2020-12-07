import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import TeamService from "../services/team";
import { AddToTeamInput, Team, TeamInput, TeamInputMany } from "../entity/team";
import {
  teamSchema,
  addUserInputSchema,
  teamInputManySchema,
} from "../schemas/team";

@Controller({ route: "/teams" })
export default class TeamController {
  constructor(private service: TeamService) {}

  @GET({
    url: "/:ideaId",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        response: { 200: teamSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { ideaId: string } }>
  ): Promise<Team[]> {
    const team = await this.service.getById(req.params.ideaId);

    if (!team) throw { statusCode: 404, message: "Entity not found" };
    return team;
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: teamInputManySchema,
        response: { 200: teamSchema },
      },
    },
  })
  async createMany(
    req: FastifyRequest<{ Body: TeamInputMany }>
  ): Promise<Team[]> {
    const values: TeamInput[] = [];
    req.body.userIds.forEach((userId: string) => {
      values.push({
        ideaId: req.body.ideaId,
        userId: userId,
        isLeader: checkLeader(req.body.leaderId, userId),
      });
    });
    return this.service.storeMany(values);
  }

  @POST({
    url: "/:ideaId",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        body: addUserInputSchema,
        response: { 200: teamSchema },
      },
    },
  })
  async addUserToTeam(
    req: FastifyRequest<{
      Params: { ideaId: string };
      Body: AddToTeamInput;
    }>
  ): Promise<Team[]> {
    await this.service.addToTeam({ ideaId: req.params.ideaId, ...req.body });
    const team = await this.service.getById(req.params.ideaId);
    if (!team) throw { statusCode: 404, message: "Entity not found" };
    return team;
  }
}

function checkLeader(leaderId: string, userId: string): boolean {
  if (leaderId === userId) {
    return true;
  } else {
    return false;
  }
}
