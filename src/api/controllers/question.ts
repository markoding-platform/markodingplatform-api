import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST, PUT } from "fastify-decorators";

import QuestionService from "../services/question";
import { Question, QuestionInput } from "../entity";
import { questionSchema, questionInputSchema } from "../schemas/question";
import authenticate from "../hooks/onRequest/authentication";

@Controller({ route: "/questions" })
export default class QuestionController {
  constructor(private service: QuestionService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: questionSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Question> {
    const question = await this.service.getById(req.params.id);

    if (!question) throw { statusCode: 404, message: "Entity not found" };
    return question;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: questionSchema } },
      },
    },
  })
  async getAll(): Promise<Question[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: questionInputSchema,
        response: { 200: questionSchema },
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: FastifyRequest<{ Body: QuestionInput }>
  ): Promise<Question> {
    return this.service.store(req.body);
  }

  @PUT({
    url: "/:questionId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { questionId: { type: "string" } },
        },
        body: questionInputSchema,
        response: { 200: questionSchema },
      },
      onRequest: authenticate,
    },
  })
  async update(
    req: FastifyRequest<{
      Params: { questionId: string };
      Body: QuestionInput;
    }>
  ): Promise<Question> {
    let updated = await this.service.update(req.params.questionId, req.body);
    updated = camelcaseKeys(updated, { deep: true });
    return updated;
  }
}
