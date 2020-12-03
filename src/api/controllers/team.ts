import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";
import hyperId from "hyperid";

import TeamService from "../services/team";
import { Team, TeamInput, TeamInputMany } from "../entity/team";
import { teamSchema, teamInputSchema } from "../schemas/team";

@Controller({ route: "/teams" })
export default class TeamController {
  constructor(private service: TeamService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: teamSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Team[]> {
    const team = await this.service.getById(req.params.id);

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
}

function checkLeader(leaderId: string, userId: string): boolean {
  if (leaderId === userId) {
    return true;
  } else {
    return false;
  }
}
