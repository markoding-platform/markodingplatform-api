import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST, PUT } from "fastify-decorators";

import BannerService from "../services/banner";
import { Banner, BannerInput } from "../entity/banner";
import { bannerSchema, bannerInputSchema } from "../schemas/banner";

@Controller({ route: "/banners" })
export default class BannerController {
  constructor(private service: BannerService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: bannerSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Banner> {
    const banner = await this.service.getById(req.params.id);
    if (!banner) throw { statusCode: 404, message: "Entity not found" };

    return banner;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: bannerSchema } },
      },
    },
  })
  async getAll(): Promise<Banner[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: bannerInputSchema,
        response: { 200: bannerSchema },
      },
    },
  })
  async create(req: FastifyRequest<{ Body: BannerInput }>): Promise<Banner> {
    return this.service.store(req.body);
  }

  @PUT({
    url: "/:bannerId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { bannerId: { type: "string" } },
        },
        body: bannerInputSchema,
        response: { 200: bannerSchema },
      },
    },
  })
  async update(
    req: FastifyRequest<{
      Params: { bannerId: string };
      Body: BannerInput;
    }>
  ): Promise<Banner> {
    const banner = await this.service.getById(req.params.bannerId);
    if (!banner) throw { statusCode: 404, message: "Entity not found" };

    let updated = await this.service.update(req.params.bannerId, req.body);
    updated = camelcaseKeys(updated, { deep: true });

    return updated;
  }
}
