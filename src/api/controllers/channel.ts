import { Controller, GET } from "fastify-decorators";

import ChannelService from "../services/channel";
import { Channel, Question } from "../entity";
import { channelSchema } from "../schemas/channel";
import { FastifyRequest } from "fastify";

@Controller({ route: "/channels" })
export default class ChannelController {
  constructor(private service: ChannelService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: channelSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Channel> {
    const channel = await this.service.getById(req.params.id);

    if (!channel) throw { statusCode: 404, message: "Entity not found" };
    return channel;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: channelSchema } },
      },
    },
  })
  async getAll(): Promise<Channel[]> {
    return this.service.getAll();
  }
}