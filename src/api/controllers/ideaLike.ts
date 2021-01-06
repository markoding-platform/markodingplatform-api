import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { IdeaLike, User } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import IdeaLikeService from "../services/ideaLike";
import IdeaService from "../services/idea";
import UserService from "../services/user";

@Controller({ route: "/ideas" })
export default class IdeaLikeController {
  constructor(
    private ideaLikeService: IdeaLikeService,
    private ideaService: IdeaService,
    private userService: UserService
  ) {}

  @POST({
    url: "/:ideaId/like",
    options: {
      schema: {
        response: 204,
      },
      onRequest: authenticate,
    },
  })
  async likeIdea(
    req: AuthenticatedRequest<{
      Params: { ideaId: string };
      User: Record<string, unknown>;
    }>,
    reply: FastifyReply
  ): Promise<IdeaLike> {
    const user = req.user?.user as User;
    const [userFound, ideaFound] = await Promise.all([
      this.userService.getOne({ id: user.id }),
      this.ideaService.getOne({ id: req.params.ideaId }),
    ]);

    if (!userFound) throw { statusCode: 404, message: "User not found" };
    if (!ideaFound) throw { statusCode: 404, message: "Idea not found" };
    if (!idea) throw { statusCode: 404, message: "Idea not found" };

    await this.ideaLikeService.storeOrDelete(idea, user);

    return reply.code(204).send();
  }
}
