import {FastifyRequest, FastifyReply} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';

import {UserService, IdeaService, IdeaTeamService} from '../services';
import authenticate from '../hooks/onRequest/authentication';
import {
  User,
  Idea,
  IdeaTeam,
  IdeaTeamInput,
  IdeaTeamPayload,
  AddToTeamInput,
} from '../entity';
import {
  teamSchema,
  teamInputSchema,
  addUserInputSchema,
} from '../schemas/ideaTeam';
import {commonParams} from '../schemas/common';

@Controller({route: '/ideas'})
export default class IdeaController {
  constructor(
    private userService: UserService,
    private ideaService: IdeaService,
    private ideaTeamService: IdeaTeamService,
  ) {}

  @GET({
    url: '/:id/team',
    options: {
      schema: {
        params: commonParams,
        response: {200: teamSchema},
      },
    },
  })
  async getTeamById(
    req: FastifyRequest<{Params: {id: string}}>,
  ): Promise<IdeaTeam[]> {
    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const team = await this.ideaTeamService.getAllByIdea(idea);
    if (!team) throw {statusCode: 404, message: 'Entity not found'};

    return team;
  }

  @POST({
    url: '/:id/team',
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
      Body: IdeaTeamPayload;
    }>,
  ): Promise<IdeaTeam[]> {
    const userLogin = req.user?.user as User;

    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const user: User = new User();
    user.id = userLogin.id;
    const values: IdeaTeamInput[] = [{idea: idea, user: user, isLeader: true}];
    req.body.userIds.forEach((userId: string) => {
      const user: User = new User();
      user.id = userId;
      values.push({idea, user, isLeader: false});
    });
    return this.ideaTeamService.store(values);
  }

  @POST({
    url: '/:id/add-to-team',
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

    const idea: Idea = generateIdeaById(req.params.id);
    const [userFound, ideaFound, teamFound] = await Promise.all([
      this.userService.getOne({id: req.body.userId}),
      this.ideaService.getOne(idea),
      this.ideaTeamService.getAllByIdea(idea),
    ]);
    if (!userFound) throw {statusCode: 404, message: 'User not found'};
    if (!ideaFound) throw {statusCode: 404, message: 'Idea not found'};
    if (!teamFound) throw {statusCode: 404, message: 'Team not found'};
    if (teamFound.length > 2) {
      throw {statusCode: 400, message: 'Team size exceeded'};
    }

    teamFound.forEach((t: IdeaTeam) => {
      if (t.user.id === user.id && !t.isLeader) {
        throw {statusCode: 400, message: 'Only leader can add to team'};
      }
    });

    await this.ideaTeamService.addToTeam({
      idea: ideaFound,
      user: userFound,
      ...req.body,
    });
    return rep.code(204).send();
  }
}

function generateIdeaById(id: string): Idea {
  const idea: Idea = new Idea();
  idea.id = id;
  return idea;
}
