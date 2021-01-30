import {FastifyReply} from 'fastify';
import {Controller, POST, GET} from 'fastify-decorators';

import {IdeaComment, User} from '../entity';
import authenticate from '../hooks/onRequest/authentication';
import {UserService, IdeaService, IdeaCommentService} from '../services';
import {commonParams, commonQueryString} from '../schemas/common';
import {paginatedIdeaCommentSchema} from '../schemas/ideaComment';
import {CommonQueryString, PaginatedResponse} from '../../libs/types';
import {paginateResponse} from '../../libs/utils';

@Controller({route: '/ideas'})
export default class IdeaCommentController {
  constructor(
    private ideaCommentService: IdeaCommentService,
    private ideaService: IdeaService,
    private userService: UserService,
  ) {}

  @POST({
    url: '/:id/comment',
    options: {
      schema: {
        params: commonParams,
        body: {type: 'object', properties: {comment: {type: 'string'}}},
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async commentIdea(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: {comment: string};
    }>,
    reply: FastifyReply,
  ): Promise<IdeaComment> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaService.getOne({id: req.params.id}),
    ]);
    if (!userFound) throw {statusCode: 404, message: 'User not found'};
    if (!ideaFound) throw {statusCode: 404, message: 'Idea not found'};

    await this.ideaCommentService.store(ideaFound, userFound, req.body.comment);
    return reply.code(204).send();
  }

  @GET({
    url: '/:id/comment',
    options: {
      schema: {
        params: commonParams,
        querystring: commonQueryString,
        response: {200: paginatedIdeaCommentSchema},
      },
    },
  })
  async getAllCommentsById(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Querystring: CommonQueryString;
    }>,
  ): Promise<PaginatedResponse<IdeaComment>> {
    const idea = await this.ideaService.getOne({id: req.params.id});
    if (!idea) throw {statusCode: 404, message: 'Idea not found'};

    const response = await this.ideaCommentService.getAllById(
      req.params.id,
      req.query,
    );
    return paginateResponse(req.query, response);
  }
}
