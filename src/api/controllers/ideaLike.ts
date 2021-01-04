import { FastifyReply } from "fastify"
import { Controller, POST } from "fastify-decorators";
import { IdeaLike, User } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import IdeaLikeService from "../services/ideaLike";
import IdeaService from "../services/idea";
import UserService from "../services/user";

@Controller({ route: "/ideas" })
export default class IdeaLikeController {
  constructor(
    private service: IdeaLikeService,
    private ideaService: IdeaService,
    private userService: UserService,
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
    reply: FastifyReply,
  ): Promise<IdeaLike> {
    const userLogin = req.user?.user as User;
    const [idea, user] = await Promise.all([
      this.ideaService.getById(req.params.ideaId),
      this.userService.getById(userLogin.id),
    ])

    if (!idea) {
      throw { statusCode: 404, message: "Idea not found" };
    }
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    // @ts-ignore
    await this.service.storeOrDelete(idea, user);

    return reply.code(204).send()
  }
}
