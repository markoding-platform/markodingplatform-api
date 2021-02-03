import {FastifyReply} from 'fastify';
import {Controller, POST, GET} from 'fastify-decorators';

import {User} from '../entity';
import authenticate from '../hooks/onRequest/authentication';
import {UserService, IdeaService, IdeaLikeService} from '../services';
import {commonParams} from '../schemas/common';

@Controller({route: '/ideas'})
export default class IdeaLikeController {
  constructor(
    private ideaLikeService: IdeaLikeService,
    private ideaService: IdeaService,
    private userService: UserService,
  ) {}

  @POST({
    url: '/:id/toggle-like',
    options: {
      schema: {
        params: commonParams,
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async likeIdea(
    req: AuthenticatedRequest<{
      Params: {id: string};
      User: Record<string, unknown>;
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaService.getOne({id: req.params.id}),
    ]);
    if (!userFound) throw {statusCode: 404, message: 'User not found'};
    if (!ideaFound) throw {statusCode: 404, message: 'Idea not found'};

    const isLiked = await this.ideaLikeService.storeOrDelete(
      ideaFound,
      userFound,
    );

    if (isLiked) {
      ideaFound.liked -= 1;
      this.ideaService.update(req.params.id, ideaFound.toIdeaLike());
    } else {
      ideaFound.liked += 1;
      this.ideaService.update(req.params.id, ideaFound.toIdeaLike());
    }

    return reply.code(204).send();
  }

  @GET({
    url: '/:id/user-voted',
    options: {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              isVoted: {type: 'boolean'},
            },
          },
        },
      },
      onRequest: authenticate,
    },
  })
  async getUserVote(
    req: AuthenticatedRequest<{Params: {id: string}}>,
  ): Promise<{isVoted: boolean}> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({id: user.id}),
      this.ideaService.getOne({id: req.params.id}),
    ]);
    if (!userFound) throw {statusCode: 404, message: 'User not found'};
    if (!ideaFound) throw {statusCode: 404, message: 'Idea not found'};

    const ideaLike = await this.ideaLikeService.getUserVote(
      req.params.id,
      user.id,
    );
    if (ideaLike) {
      return {isVoted: true};
    }
    return {isVoted: false};
  }
}
