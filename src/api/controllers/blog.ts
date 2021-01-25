import {FastifyRequest} from 'fastify';
import {Controller, GET} from 'fastify-decorators';

import {BlogService} from '../services';
import {Blog} from '../entity';
import {blogSchema} from '../schemas/blog';
import {commonParams} from '../schemas/common';

@Controller({route: '/blogs'})
export default class BlogController {
  constructor(private service: BlogService) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: blogSchema},
      },
    },
  })
  async getById(req: FastifyRequest<{Params: {id: string}}>): Promise<Blog> {
    const blog = await this.service.getById(req.params.id);
    if (!blog) throw {statusCode: 404, message: 'Entity not found'};

    return blog;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        response: {200: {type: 'array', items: blogSchema}},
      },
    },
  })
  async getAll(
    req: FastifyRequest<{Querystring: {limit: number; offset: number}}>,
  ): Promise<Blog[]> {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    return this.service.getAll(offset, limit);
  }
}
