import camelcaseKeys from 'camelcase-keys';
import {FastifyRequest} from 'fastify';
import {Controller, GET, POST, PUT} from 'fastify-decorators';

import {UserService, IdeaService, IdeaUserService} from '../services';
import authenticate from '../hooks/onRequest/authentication';
import {User, Idea, IdeaInput, IdeaUser} from '../entity';
import {ideaSchema, ideaInputSchema} from '../schemas/idea';
import {commonParams, commonQueryString} from '../schemas/common';

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
        querystring: commonQueryString,
        response: {200: {type: 'array', items: ideaSchema}},
      },
    },
  })
  async getAllIdeas(
    req: FastifyRequest<{
      Params: {id: string};
      Querystring: {limit: number; offset: number};
    }>,
  ): Promise<Idea[]> {
    return this.ideaService.getAll(req.query.limit, req.query.offset);
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

    const u: User = new User();
    u.id = user.id;
    const ideaUser: IdeaUser = new IdeaUser();
    ideaUser.user = u;

    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaUserService.getOne(ideaUser),
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

    const u: User = new User();
    u.id = user.id;
    const idea: Idea = new Idea();
    idea.id = req.params.id;
    const ideaUser: IdeaUser = new IdeaUser();
    ideaUser.user = u;
    ideaUser.idea = idea;

    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaUserService.getOne(ideaUser),
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
