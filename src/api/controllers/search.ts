import {Controller, GET} from 'fastify-decorators';
import {searchSchema} from '../schemas/search';
import EventService from '../services/event';
import IdeaService from '../services/idea';
import {commonQueryString} from '../schemas/common';
import {FastifyRequest} from 'fastify';
import {SearchResponse} from '../../libs/types';
import {Blog, Event, Idea} from '../entity';
import BlogService from '../services/blog';

@Controller({route: '/search'})
export default class QuestionController {
  constructor(
    private ideaService: IdeaService,
    private eventService: EventService,
    private blogService: BlogService,
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
  ): Promise<SearchResponse<Idea, Event, Blog>> {
    const {keyword} = req.query;
    const ideas = await this.ideaService.getSearch(keyword);
    const events = await this.eventService.getSearch(keyword);
    const blogs = await this.blogService.getSearch(keyword);
    return {
      ideas: ideas,
      events: events,
      blogs: blogs,
    };
  }
}
