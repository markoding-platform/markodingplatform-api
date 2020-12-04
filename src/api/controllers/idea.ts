import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import IdeaService from "../services/idea";
import { Idea, IdeaInput } from "../entity/idea";
import { ideaSchema, ideaInputSchema } from "../schemas/idea";

@Controller({ route: "/ideas" })
export default class IdeaController {
  constructor(private service: IdeaService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: ideaSchema },
      },
    },
  })
  async getIdeaById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Idea> {
    const idea = await this.service.getById(req.params.id);

    if (!idea) throw { statusCode: 404, message: "Entity not found" };
    return idea;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: ideaSchema } },
      },
    },
  })
  async getAllIdeas(): Promise<Idea[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: ideaInputSchema,
        response: { 200: ideaSchema },
      },
    },
  })
  async createOrUpdate(
    req: FastifyRequest<{ Body: IdeaInput }>
  ): Promise<Idea> {
    return await this.service.store(req.body);
  }
}
