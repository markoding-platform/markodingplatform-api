import camelcaseKeys from 'camelcase-keys';
import {FastifyRequest} from 'fastify';
import {Controller, GET, POST, PUT} from 'fastify-decorators';
import {snakeCase} from 'lodash';

import {
  UserService,
  IdeaService,
  IdeaUserService,
  IdeaProblemAreaService,
} from '../services';
import authenticate from '../hooks/onRequest/authentication';
import {
  User,
  Idea,
  IdeaInput,
  IdeaUser,
  IdeaResponse,
  IdeaProblemArea,
} from '../entity';
import {
  ideaSchema,
  ideaCommentSchema,
  ideaInputSchema,
  paginatedIdeaSchema,
  paginatedLeaderboardSchema,
  ideaQueryStringSchema,
  ideaProblemAreaSchema,
} from '../schemas/idea';
import {commonParams} from '../schemas/common';
import {PaginatedResponse, IdeaQueryString} from '../../libs/types';
import {paginateResponse} from '../../libs/utils';

@Controller({route: '/ideas'})
export class IdeaController {
  constructor(
    private userService: UserService,
    private ideaService: IdeaService,
    private ideaUserService: IdeaUserService,
    private ideaProblemAreaService: IdeaProblemAreaService,
  ) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: ideaCommentSchema},
      },
    },
  })
  async getIdeaById(
    req: FastifyRequest<{Params: {id: string}}>,
  ): Promise<IdeaResponse> {
    const idea = await this.ideaService.getOne({id: req.params.id});
    if (!idea) throw {statusCode: 404, message: 'Idea not found'};

    return idea;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: ideaQueryStringSchema,
        response: {200: paginatedIdeaSchema},
      },
    },
  })
  async getAllIdeas(
    req: FastifyRequest<{Querystring: IdeaQueryString}>,
  ): Promise<PaginatedResponse<Idea>> {
    const orderEnum = ['solutionType', 'solutionName', 'liked'];
    let sorts = '';
    if (req.query.sort) {
      sorts = transformSort(req.query.sort, orderEnum);
    }

    const response = await this.ideaService.getAll({...req.query, sort: sorts});
    return paginateResponse(req.query, response);
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
    req: AuthenticatedRequest<{Body: IdeaInput & {problemAreaId: number}}>,
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

    const problemArea = new IdeaProblemArea();
    problemArea.id = req.body.problemAreaId;
    return this.ideaService.store({...req.body, problemArea});
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
      Body: IdeaInput & {problemAreaId: number};
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

    const problemArea = new IdeaProblemArea();
    problemArea.id = req.body.problemAreaId;
    // @ts-ignore
    delete req.body.problemAreaId;
    let updated = await this.ideaService.update(req.params.id, {
      ...req.body,
      problemArea,
    });
    updated = camelcaseKeys(updated, {deep: true});

    if (!Array.isArray(updated.solutionSupportingPhotos)) {
      updated.solutionSupportingPhotos = [];
    }

    return updated;
  }

  @GET({
    url: '/problem-area',
    options: {
      schema: {
        response: {200: ideaProblemAreaSchema},
      },
    },
  })
  async getAllIdeaProblemAreas(): Promise<IdeaProblemArea[]> {
    return this.ideaProblemAreaService.getAll();
  }
}

@Controller({route: '/leaderboards/team'})
export class LeaderboardController {
  constructor(private ideaService: IdeaService) {}

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: ideaQueryStringSchema,
        response: {200: paginatedLeaderboardSchema},
      },
    },
  })
  async getTeamLeaderboard(
    req: FastifyRequest<{Querystring: IdeaQueryString}>,
  ): Promise<PaginatedResponse<Idea>> {
    const orderEnum = ['liked'];

    if (req.query.sort) {
      req.query.sort = transformSort(req.query.sort, orderEnum);
    }

    const response = await this.ideaService.getAll(req.query);
    return paginateResponse(req.query, response);
  }
}

function transformSort(sort: string, order: string[]): string {
  let sorts = '';
  sort.split(',').forEach((s: string) => {
    let ss = s;
    if (ss.startsWith('-')) ss = s.slice(1);
    if (order.indexOf(ss) < 0) {
      return;
    }

    if (sorts.length) {
      sorts += ',';
      sorts += s.startsWith('-') ? '-' + snakeCase(s) : snakeCase(s);
    } else {
      sorts += s.startsWith('-') ? '-' + snakeCase(s) : snakeCase(s);
    }
  });
  return sorts;
}
