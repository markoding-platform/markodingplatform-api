import {FastifyRequest} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';

import ChatService from '../services/chat';
import {Chat, ChatInput} from '../entity';
import authenticate from '../hooks/onRequest/authentication';
import {commonParams, commonQueryString} from '../schemas/common';
import {
  chatSchema,
  chatInputSchema,
  paginatedChatSchema,
} from '../schemas/chat';
import {CommonQueryString, PaginatedResponse} from '../../libs/types';
import {paginateResponse} from '../../libs/utils';

@Controller({route: '/chats'})
export default class ChatController {
  constructor(private service: ChatService) {}

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedChatSchema},
      },
      onRequest: authenticate,
    },
  })
  async getRecent(
    req: FastifyRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<Chat>> {
    const response = await this.service.getRecent(
      req.query.limit || 6,
      req.query.offset || 0,
    );
    return paginateResponse(req.query, response);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: chatSchema},
      },
      onRequest: authenticate,
    },
  })
  async getById(req: FastifyRequest<{Params: {id: string}}>): Promise<Chat> {
    const question = await this.service.getById(+req.params.id);

    if (!question) throw {statusCode: 404, message: 'Entity not found'};
    return question;
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: chatInputSchema,
        response: {200: chatSchema},
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{
      Body: ChatInput;
    }>,
  ): Promise<Chat> {
    const user = req.user.user;
    const data = req.body;
    data.user = user;
    return this.service.store(data);
  }
}
