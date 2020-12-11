import camelcaseKeys from "camelcase-keys";
import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import AnnouncementService from "../services/announcement";
import { Announcement, AnnouncementInput } from "../entity/announcement";
import {
  announcementSchema,
  announcementInputSchema,
} from "../schemas/announcement";

@Controller({ route: "/announcements" })
export default class AnnouncementController {
  constructor(private service: AnnouncementService) {}

  @GET({
    url: "/:announcementId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { announcementId: { type: "string" } },
        },
        response: { 200: announcementSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { announcementId: string } }>
  ): Promise<Announcement> {
    const announcement = await this.service.getById(req.params.announcementId);
    if (!announcement) throw { statusCode: 404, message: "Entity not found" };

    return announcement;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: announcementSchema } },
      },
    },
  })
  async getAll(): Promise<Announcement[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: announcementInputSchema,
        response: { 200: announcementSchema },
      },
    },
  })
  async create(
    req: FastifyRequest<{ Body: AnnouncementInput }>
  ): Promise<Announcement> {
    return this.service.store(req.body);
  }

  @POST({
    url: "/:announcementId",
    options: {
      schema: {
        params: {
          type: "object",
          properties: { announcementId: { type: "string" } },
        },
        body: announcementInputSchema,
        response: { 200: announcementSchema },
      },
    },
  })
  async update(
    req: FastifyRequest<{
      Params: { announcementId: string };
      Body: AnnouncementInput;
    }>
  ): Promise<Announcement> {
    const announcement = await this.service.getById(req.params.announcementId);
    if (!announcement) throw { statusCode: 404, message: "Entity not found" };

    let updated = await this.service.update(
      req.params.announcementId,
      req.body
    );
    updated = camelcaseKeys(updated, { deep: true });

    return updated;
  }
}
