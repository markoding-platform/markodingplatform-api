import {FastifyRequest} from 'fastify';
import {Controller, GET} from 'fastify-decorators';
import {snakeCase} from 'lodash';

import BlogService from '../services/blog';
import {Blog} from '../entity/blog';
import {blogSchema, paginatedBlogSchema} from '../schemas/blog';
import {commonParams, commonQueryString} from '../schemas/common';
import {paginateResponse} from '../../libs/utils';
import {CommonQueryString, PaginatedResponse} from '../../libs/types';

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
        querystring: commonQueryString,
        response: {200: paginatedBlogSchema},
      },
    },
  })
  async getAll(
    req: FastifyRequest<{Querystring: CommonQueryString}>,
  ): Promise<PaginatedResponse<Blog>> {
    const {limit, offset, sort} = req.query;
    const orderEnum = ['title', 'createdAt'];

    let sorts = '';
    if (sort) {
      sort.split(',').forEach((s: string) => {
        if (orderEnum.indexOf(s, 1) < 0) {
          return;
        }

        sorts += snakeCase(s);
      });
    }

    const response = await this.service.getAll({limit, offset, sort: sorts});
    return paginateResponse(req.query, response);
  }
}
