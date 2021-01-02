import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST, PATCH, PUT } from "fastify-decorators";

import BannerService from "../services/banner";
import { Banner, BannerInput } from "../entity/banner";
import {
  bannerSchema,
  bannerInputSchema,
  bannerUpdateSchema,
} from "../schemas/banner";

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
    if (req.body.sort) {
      const banner = await this.service.getOne({
        sort: req.body.sort,
        isActive: true,
      });
      if (banner) throw { statusCode: 400, message: "Sort already used." };
    }

    return this.service.store(req.body);
  }

  @PATCH({
    url: "/:bannerId/inactive",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { bannerId: { type: "string" } },
        },
        response: { 200: bannerSchema },
      },
    },
  })
  async inactive(
    req: FastifyRequest<{
      Params: { bannerId: string };
    }>
  ): Promise<Banner> {
    const banner = await this.service.getById(req.params.bannerId);
    if (!banner) throw { statusCode: 404, message: "Entity not found" };

    let updated = await this.service.update(req.params.bannerId, {
      isActive: false,
    });
    updated = camelcaseKeys(updated, { deep: true });

    return updated;
  }

  @PUT({
    url: "/:bannerId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { bannerId: { type: "string" } },
        },
        body: bannerUpdateSchema,
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
