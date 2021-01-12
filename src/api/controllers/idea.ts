import camelcaseKeys from 'camelcase-keys';
import {FastifyRequest} from 'fastify';
import {Controller, GET, POST, PUT} from 'fastify-decorators';

import {UserService, IdeaService, IdeaUserService} from '../services';
import authenticate from '../hooks/onRequest/authentication';
import {User, Idea, IdeaInput, IdeaUser} from '../entity';
import {ideaSchema, ideaInputSchema} from '../schemas/idea';
import {commonParams} from '../schemas/common';

@Controller({route: '/ideas'})
export default class IdeaController {
  constructor(
    private userService: UserService,
    private ideaService: IdeaService,
    private ideaUserService: IdeaUserService,
  ) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: ideaSchema},
      },
    },
  })
  async getIdeaById(
    req: FastifyRequest<{Params: {id: string}}>,
  ): Promise<Idea> {
    const idea = await this.ideaService.getOne({id: req.params.id});
    if (!idea) throw {statusCode: 404, message: 'Idea not found'};

    return idea;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        response: {200: {type: 'array', items: ideaSchema}},
      },
    },
  })
  async getAllIdeas(): Promise<Idea[]> {
    return this.ideaService.getAll();
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: ideaInputSchema,
        response: {200: ideaSchema},
      },
      onRequest: authenticate,
    },
  })
  async createIdea(
    req: AuthenticatedRequest<{Body: IdeaInput}>,
  ): Promise<Idea> {
    const user = req.user?.user as User;

    const u: User = generateUserById(user.id);
    const idea: IdeaUser = generateIdeaUserByUser(u);
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaUserService.getOne(idea),
    ]);
    if (!userFound) throw {statusCode: 400, message: 'User not found'};
    if (ideaFound) throw {statusCode: 400, message: 'User already on team'};

    if (!req.body.solutionSupportingPhotos) {
      req.body.solutionSupportingPhotos = [];
    }

    return this.ideaService.store(req.body);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        body: ideaInputSchema,
        response: {200: ideaSchema},
      },
      onRequest: authenticate,
    },
  })
  async updateIdea(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: IdeaInput;
    }>,
  ): Promise<Idea> {
    const user = req.user?.user as User;
    const u: User = generateUserById(user.id);
    const idea: IdeaUser = generateIdeaUserByUser(u);
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaUserService.getOne(idea),
    ]);
    if (!userFound) throw {statusCode: 400, message: 'User not found'};
    if (!ideaFound) {
      throw {statusCode: 400, message: 'User not on this team idea'};
    }

    let updated = await this.ideaService.update(req.params.id, req.body);
    updated = camelcaseKeys(updated, {deep: true});

    if (!Array.isArray(updated.solutionSupportingPhotos)) {
      updated.solutionSupportingPhotos = [];
    }

    return updated;
  }
}

function generateUserById(id: string): User {
  const user: User = new User();
  user.id = id;
  return user;
}

function generateIdeaUserByUser(user: User): IdeaUser {
  const team: IdeaUser = new IdeaUser();
  team.user = user;
  return team;
}
