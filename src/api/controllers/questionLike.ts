import { Controller, POST } from "fastify-decorators";
import { QuestionLike, QuestionLikeInput, User } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import QuestionLikeService from "../services/questionLike";
import {
  questionLikeInputSchema,
  questionLikeSchema,
} from "../schemas/questionLike";

@Controller({ route: "/questions/likes" })
export default class QuestionLikeController {
  constructor(private service: QuestionLikeService) {}

  @POST({
    url: "/",
    options: {
      schema: {
        body: questionLikeInputSchema,
        response: { 200: questionLikeSchema },
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: QuestionLikeInput;
      User: Record<string, unknown>;
    }>
  ): Promise<QuestionLike> {
    const user = req.user?.user as User;
    const data = req.body;
    data.user = user;
    return this.service.updateOrStore(data);
  }
}
