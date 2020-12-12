import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import EventService from "../services/event";
import { Event, EventInput } from "../entity/event";
import { eventSchema, eventInputSchema } from "../schemas/event";

@Controller({ route: "/events" })
export default class EventController {
  constructor(private service: EventService) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: eventSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Event> {
    const event = await this.service.getById(req.params.id);

    if (!event) throw { statusCode: 404, message: "Entity not found" };
    return event;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: eventSchema } },
      },
    },
  })
  async getAllIdeas(): Promise<Event[]> {
    return this.service.getAll();
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: eventInputSchema,
        response: { 200: eventSchema },
      },
    },
  })
  async createOrUpdate(
    req: FastifyRequest<{ Body: EventInput }>
  ): Promise<Event> {
    return await this.service.store(req.body);
  }
}
