import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST, PUT } from "fastify-decorators";

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
  async getById(
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
  async getAll(): Promise<Idea[]> {
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
  async create(req: FastifyRequest<{ Body: IdeaInput }>): Promise<Idea> {
    if (!req.body.solutionSupportingPhotos) {
      req.body.solutionSupportingPhotos = [];
    }

    return this.service.store(req.body);
  }

  @PUT({
    url: "/:ideaId",
    options: {
      schema: {
        params: { type: "object", properties: { ideaId: { type: "string" } } },
        body: ideaInputSchema,
        response: { 200: ideaSchema },
      },
    },
  })
  async update(
    req: FastifyRequest<{
      Params: { ideaId: string };
      Body: IdeaInput;
    }>
  ): Promise<Idea> {
    let updated = await this.service.update(req.params.ideaId, req.body);
    updated = camelcaseKeys(updated, { deep: true });
    if (!Array.isArray(updated.solutionSupportingPhotos)) {
      updated.solutionSupportingPhotos = [];
    }

    return updated;
  }
}
