import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import TeamService from "../services/team";
import { AddToTeamInput, User, Team, TeamInput, TeamPayload } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import {
  teamSchema,
  addUserInputSchema,
  teamInputSchema,
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
        body: teamInputSchema,
        response: { 200: teamSchema },
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: TeamPayload;
      User: Record<string, unknown>;
    }>
  ): Promise<Team[]> {
    const user = req.user?.user as User;
    user.id = "69932052-ed9b-4497-87a4-e159b1df9927"

    const values: TeamInput[] = [{
      ideaId: req.body.ideaId,
      userId: user.id,
      isLeader: true,
    }];
    req.body.userIds.forEach((userId: string) => {
      values.push({
        ideaId: req.body.ideaId,
        userId: userId,
        isLeader: false,
      });
    });
    return this.service.store(values);
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
