import {Controller, GET} from 'fastify-decorators';
import {searchSchema} from '../schemas/search';
import EventService from '../services/event';
import IdeaService from '../services/idea';
import {commonQueryString} from '../schemas/common';
import {FastifyRequest} from 'fastify';
import {SearchResponse} from '../../libs/types';
import {Event, Idea} from '../entity';

@Controller({route: '/search'})
export default class QuestionController {
  constructor(
    private ideaService: IdeaService,
    private eventService: EventService,
  ) {}

  @GET({
    url: '/',
    options: {
      schema: {
        querystring: commonQueryString,
        response: {200: searchSchema},
      },
    },
  })
  async get(
    req: FastifyRequest<{
      Querystring: {keyword: string};
    }>,
  ): Promise<SearchResponse<Idea, Event>> {
    const {keyword} = req.query;
    const idea = await this.ideaService.getSearch(keyword);
    const event = await this.eventService.getSearch(keyword);
    return {
      idea: idea,
      events: event,
    };
  }
}
