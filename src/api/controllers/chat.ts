import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import { Chat, ChatInput, User } from "../entity";
import { chatSchema, chatInputSchema } from "../schemas/chat";
import authenticate from "../hooks/onRequest/authentication";
import ChatService from "../services/chat";

@Controller({ route: "/chats" })
export default class ChatController {
  constructor(private service: ChatService) {}

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: chatSchema } },
      },
      onRequest: authenticate,
    },
  })
  async getRecent(
    req: FastifyRequest<{
      Querystring: { limit: number; offset: number };
    }>
  ): Promise<Chat[]> {
    return this.service.getRecent(req.query.limit || 6, req.query.offset || 0);
  }

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: chatSchema },
      },
      onRequest: authenticate,
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Chat> {
    const question = await this.service.getById(+req.params.id);

    if (!question) throw { statusCode: 404, message: "Entity not found" };
    return question;
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: chatInputSchema,
        response: { 200: chatSchema },
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: ChatInput;
      User: Record<string, unknown>;
    }>
  ): Promise<Chat> {
    const user = req.user?.user as User;
    const data = req.body;
    data.user = user;
    return this.service.store(data);
  }
}