import {FastifyReply} from 'fastify';
import {Controller, POST} from 'fastify-decorators';

import {IdeaComment, User} from '../entity';
import authenticate from '../hooks/onRequest/authentication';
import {UserService, IdeaService, IdeaCommentService} from '../services';
import {commonParams} from '../schemas/common';

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
      User: Record<string, unknown>;
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
}
