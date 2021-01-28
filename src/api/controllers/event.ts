import {FastifyRequest} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';

import EventService from '../services/event';
import {Event, EventInput} from '../entity/event';
import {
  eventSchema,
  eventInputSchema,
  paginatedEventSchema,
} from '../schemas/event';
import {commonParams, commonQueryString} from '../schemas/common';
import {validateDateInput, paginateResponse} from '../../libs/utils';
import {CommonQueryString, PaginatedResponse} from '../../libs/types';

@Controller({route: '/events'})
export default class EventController {
  constructor(private service: EventService) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: eventSchema},
      },
    },
  })
  async getById(req: FastifyRequest<{Params: {id: string}}>): Promise<Event> {
    const event = await this.service.getById(req.params.id);

    if (!event) throw {statusCode: 404, message: 'Entity not found'};
    return event;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: paginatedEventSchema},
      },
    },
  })
  async getAll(
    req: FastifyRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<Event>> {
    const response = await this.service.getAll(req.query);
    return paginateResponse(req.query, response);
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: eventInputSchema,
        response: {200: eventSchema},
      },
    },
  })
  async create(req: FastifyRequest<{Body: EventInput}>): Promise<Event> {
    if (validateDateInput(req.body.startDate)) {
      return await this.service.store(req.body);
    }

    throw {statusCode: 400, message: 'Bad Request'};
  }
}
