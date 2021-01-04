import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import ProfileService from "../services/profile";
import { Profile, ProfileInput } from "../entity/profile";
import { profileSchema, profileInputSchema } from "../schemas/profile";

@Controller({ route: "/profiles" })
export default class IdeaController {
  constructor(private service: ProfileService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: profileSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Profile> {
    const idea = await this.service.getById(req.params.id);

    if (!idea) throw { statusCode: 404, message: "Entity not found" };
    return idea;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: profileSchema } },
      },
    },
  })
  async getAll(): Promise<Profile[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: profileInputSchema,
        response: { 200: profileSchema },
      },
    },
  })
  async create(req: FastifyRequest<{ Body: ProfileInput }>): Promise<Profile> {
    return this.service.store(req.body);
  }

  @POST({
    url: "/:profileId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { profileId: { type: "string" } },
        },
        body: profileInputSchema,
        response: { 200: profileSchema },
      },
    },
  })
  async update(
    req: FastifyRequest<{
      Params: { profileId: string };
      Body: ProfileInput;
    }>
  ): Promise<Profile> {
    let updated = await this.service.update(req.params.profileId, req.body);
    updated = camelcaseKeys(updated, { deep: true });

    return updated;
  }
}
