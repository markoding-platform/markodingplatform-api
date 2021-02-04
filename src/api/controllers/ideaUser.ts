import {FastifyRequest, FastifyReply} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';

import {UserService, IdeaService, IdeaUserService} from '../services';
import authenticate from '../hooks/onRequest/authentication';
import {
  User,
  Idea,
  IdeaUser,
  IdeaUserInput,
  IdeaUserPayload,
  AddToTeamInput,
} from '../entity';
import {
  teamSchema,
  teamInputSchema,
  addUserInputSchema,
} from '../schemas/ideaUser';
import {commonParams} from '../schemas/common';

@Controller({route: '/ideas'})
export default class IdeaController {
  constructor(
    private userService: UserService,
    private ideaService: IdeaService,
    private ideaUserService: IdeaUserService,
  ) {}

  @GET({
    url: '/:id/users',
    options: {
      schema: {
        params: commonParams,
        response: {200: teamSchema},
      },
    },
  })
  async getTeamById(
    req: FastifyRequest<{Params: {id: string}}>,
  ): Promise<IdeaUser[]> {
    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const users = await this.ideaUserService.getAllUsersByIdea(idea);
    if (!users) throw {statusCode: 404, message: 'Entity not found'};

    return users;
  }

  @POST({
    url: '/:id/users',
    options: {
      schema: {
        params: commonParams,
        body: teamInputSchema,
        response: {200: teamSchema},
      },
      onRequest: authenticate,
    },
  })
  async createTeam(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: IdeaUserPayload;
    }>,
  ): Promise<IdeaUser[]> {
    const userLogin = req.user?.user as User;

    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const user: User = new User();
    user.id = userLogin.id;
    const team: IdeaUserInput[] = [{idea, user, isLeader: true}];

    const userIds = req.body.userIds;
    const uniqueUserIds = userIds.filter(
      (id: string, i: number) => userIds.indexOf(id) == i,
    );
    uniqueUserIds.forEach((userId: string) => {
      const user: User = new User();
      user.id = userId;
      team.push({idea, user, isLeader: false});
    });

    for (const t of team) {
      const [userFound, userFoundOnTeam] = await Promise.all([
        this.userService.getOne({id: t.user.id}),
        this.ideaUserService.getIdeaByUser(user),
      ]);

      if (!userFound) throw {statusCode: 400, message: 'User not found'};
      if (userFoundOnTeam) {
        throw {statusCode: 400, message: 'User already on team'};
      }
    }

    return this.ideaUserService.store(team);
  }

  @POST({
    url: '/:id/add-user',
    options: {
      schema: {
        params: commonParams,
        body: addUserInputSchema,
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async addUserToTeam(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: AddToTeamInput;
    }>,
    rep: FastifyReply,
  ): Promise<void> {
    const user = req.user?.user as User;

    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const [
      userFound,
      ideaFound,
      ideaUsersFound,
      userFoundOnTeam,
    ] = await Promise.all([
      this.userService.getOne({id: req.body.userId}),
      this.ideaService.getOne(idea),
      this.ideaUserService.getAllUsersByIdea(idea),
      this.ideaUserService.getIdeaByUser(user),
    ]);
    if (!userFound) throw {statusCode: 404, message: 'User not found'};
    if (!ideaFound) throw {statusCode: 404, message: 'Idea not found'};
    if (!ideaUsersFound) throw {statusCode: 404, message: 'Team not found'};
    if (userFoundOnTeam) {
      throw {statusCode: 400, message: 'User already on team'};
    }

    ideaUsersFound.forEach((u: IdeaUser) => {
      if (u.user.id === user.id && !u.isLeader) {
        throw {statusCode: 400, message: 'Only leader can add to team'};
      }
    });

    await this.ideaUserService.addToTeam({
      idea: ideaFound,
      user: userFound,
      ...req.body,
    });
    return rep.code(204).send();
  }
}
