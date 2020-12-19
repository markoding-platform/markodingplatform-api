import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import {
  questionCommentSchema,
  questionCommentInputSchema,
} from "../schemas/questionComment";
import { QuestionComment, QuestionCommentInput, User } from "../entity";
import authenticate from "../hooks/onRequest/authentication";
import QuestionCommentService from "../services/questionComment";

@Controller({ route: "/questions/comments" })
export default class QuestionCommentController {
  constructor(private service: QuestionCommentService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        response: { 200: { type: "array", items: questionCommentSchema } },
      },
    },
  })
  async getByQuestion(
    req: FastifyRequest<{
      Params: { id: string };
      Querystring: { limit: number; offset: number };
    }>
  ): Promise<QuestionComment[]> {
    return this.service.getByQuestion(
      req.params.id,
      req.query.limit,
      req.query.offset
    );
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: questionCommentInputSchema,
        response: { 200: questionCommentSchema },
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: QuestionCommentInput;
      User: Record<string, unknown>;
    }>
  ): Promise<QuestionComment> {
    const user = req.user?.user as User;
    const data = req.body;
    data.user = user;
    return this.service.store(data);
  }
}
