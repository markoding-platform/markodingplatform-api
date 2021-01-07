import {FastifyRequest} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';
import camelcaseKeys from 'camelcase-keys';

import {AdminService, BlogService} from '../services';
import {Admin, User, Blog, BlogInput, BlogAuthor} from '../entity';
import {blogSchema, blogInputSchema} from '../schemas/blog';
import authenticate from '../hooks/onRequest/authentication';
import {queryParamId} from '../schemas/common';

@Controller({route: '/blogs'})
export default class BlogController {
  constructor(
    private blogService: BlogService,
    private adminService: AdminService,
  ) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: queryParamId,
        response: {200: blogSchema},
      },
    },
  })
  async getById(req: FastifyRequest<{Params: {id: string}}>): Promise<Blog> {
    const blog = await this.blogService.getById(req.params.id);
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
    return this.blogService.getAll(offset, limit);
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: blogInputSchema,
        response: {200: blogSchema},
      },
      onRequest: authenticate,
    },
  })
  async createOrUpdate(
    req: AuthenticatedRequest<{
      Body: BlogInput;
      User: Record<string, unknown>;
    }>,
  ): Promise<BlogAuthor> {
    const user = req.user?.user as User;

    // how to this??
    const u = new User();
    u.id = user.id;
    const a = new Admin();
    a.user = u;
    const admin = await this.adminService.getOne(a);
    if (!admin) throw {statusCode: 404, message: 'Admin not found'};

    const blog = await this.blogService.store(
      camelcaseKeys({
        ...req.body,
        adminId: user.id,
      }),
    );

    return {
      ...blog,
      author: {
        id: admin.id,
        name: admin.name,
      },
    };
  }
}
