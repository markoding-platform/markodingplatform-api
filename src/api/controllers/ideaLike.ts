import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { IdeaLike, User } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import { UserService, IdeaService, IdeaLikeService } from "../services";
import { queryParamId } from "../schemas/common";

@Controller({ route: "/ideas" })
export default class IdeaLikeController {
  constructor(
    private service: IdeaLikeService,
    private ideaService: IdeaService,
    private userService: UserService
  ) {}

  @POST({
    url: "/:id/like",
    options: {
      schema: {
        params: queryParamId,
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async likeIdea(
    req: AuthenticatedRequest<{
      Params: { id: string };
      User: Record<string, unknown>;
    }>,
    reply: FastifyReply
  ): Promise<IdeaLike> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({ id: user.id }),
      this.ideaService.getOne({ id: req.params.id }),
    ]);
    if (!userFound) throw { statusCode: 404, message: "User not found" };
    if (!ideaFound) throw { statusCode: 404, message: "Idea not found" };

    // @ts-ignore
    await this.service.storeOrDelete(idea, user);

    return reply.code(204).send();
  }
}
