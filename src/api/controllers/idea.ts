import camelcaseKeys from "camelcase-keys";
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, POST, PUT } from "fastify-decorators";

import { UserService, IdeaService, TeamService } from "../services";
import authenticate from "../hooks/onRequest/authentication";
import {
  User,
  Idea,
  IdeaInput,
  Team,
  TeamInput,
  TeamPayload,
  AddToTeamInput,
} from "../entity";
import { ideaSchema, ideaInputSchema } from "../schemas/idea";
import {
  teamSchema,
  teamInputSchema,
  addUserInputSchema,
} from "../schemas/team";

@Controller({ route: "/ideas" })
export default class IdeaController {
  constructor(
    private userService: UserService,
    private ideaService: IdeaService,
    private teamService: TeamService
  ) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: ideaSchema },
      },
    },
  })
  async getIdeaById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Idea> {
    const idea = await this.ideaService.getOne({ id: req.params.id });
    if (!idea) throw { statusCode: 404, message: "Idea not found" };

    return idea;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: ideaSchema } },
      },
    },
  })
  async getAllIdeas(): Promise<Idea[]> {
    return this.ideaService.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: ideaInputSchema,
        response: { 200: ideaSchema },
      },
      onRequest: authenticate,
    },
  })
  async createIdea(
    req: AuthenticatedRequest<{
      Body: IdeaInput;
      User: Record<string, unknown>;
    }>
  ): Promise<Idea> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({ id: user.id }),
      this.teamService.getOne({ userId: user.id }),
    ]);
    if (!userFound) throw { statusCode: 400, message: "User not found" };
    if (ideaFound) throw { statusCode: 400, message: "User already on team" };

    if (!req.body.solutionSupportingPhotos) {
      req.body.solutionSupportingPhotos = [];
    }

    return this.ideaService.store(req.body);
  }

  @PUT({
    url: "/:ideaId",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        body: ideaInputSchema,
        response: { 200: ideaSchema },
      },
      onRequest: authenticate,
    },
  })
  async updateIdea(
    req: AuthenticatedRequest<{
      Params: { ideaId: string };
      Body: IdeaInput;
    }>
  ): Promise<Idea> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({ id: user.id }),
      this.teamService.getOne({
        userId: user.id,
        ideaId: req.params.ideaId,
      }),
    ]);
    if (!userFound) throw { statusCode: 400, message: "User not found" };
    if (!ideaFound)
      throw { statusCode: 400, message: "User not on this team idea" };

    let updated = await this.ideaService.update(req.params.ideaId, req.body);
    updated = camelcaseKeys(updated, { deep: true });

    if (!Array.isArray(updated.solutionSupportingPhotos)) {
      updated.solutionSupportingPhotos = [];
    }

    return updated;
  }

  @GET({
    url: "/:ideaId/team",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        response: { 200: teamSchema },
      },
    },
  })
  async getTeamById(
    req: FastifyRequest<{ Params: { ideaId: string } }>
  ): Promise<Team[]> {
    const team = await this.teamService.getByIdeaId(req.params.ideaId);
    if (!team) throw { statusCode: 404, message: "Entity not found" };

    return team;
  }

  @POST({
    url: "/:ideaId/team",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        body: teamInputSchema,
        response: { 200: teamSchema },
      },
      onRequest: authenticate,
    },
  })
  async createTeam(
    req: AuthenticatedRequest<{
      Params: { ideaId: string };
      Body: TeamPayload;
      User: Record<string, unknown>;
    }>
  ): Promise<Team[]> {
    const user = req.user?.user as User;

    const values: TeamInput[] = [
      {
        ideaId: req.params.ideaId,
        userId: user.id,
        isLeader: true,
      },
    ];
    req.body.userIds.forEach((userId: string) => {
      values.push({
        ideaId: req.params.ideaId,
        userId: userId,
        isLeader: false,
      });
    });
    return this.teamService.store(values);
  }

  @POST({
    url: "/:ideaId/add-to-team",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        body: addUserInputSchema,
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async addUserToTeam(
    req: AuthenticatedRequest<{
      Params: { ideaId: string };
      Body: AddToTeamInput;
      User: Record<string, unknown>;
    }>,
    rep: FastifyReply
  ): Promise<void> {
    const user = req.user?.user as User;
    const [userFound, teamFound] = await Promise.all([
      this.userService.getOne({ id: user.id }),
      this.teamService.getByIdeaId(req.params.ideaId),
    ]);
    if (!userFound) throw { statusCode: 404, message: "User not found" };
    if (!teamFound) throw { statusCode: 404, message: "Team not found" };
    if (teamFound.length > 2) {
      throw { statusCode: 400, message: "Team size exceeded" };
    }

    teamFound.forEach((t: Team) => {
      if (t.userId === user.id && !t.isLeader) {
        throw { statusCode: 400, message: "Only leader can add to team" };
      }
    });

    await this.teamService.addToTeam({
      ideaId: req.params.ideaId,
      ...req.body,
    });
    return rep.code(204).send();
  }
}
