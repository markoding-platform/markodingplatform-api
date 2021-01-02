import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import BlogService from "../services/blog";
import AdminService from "../services/admin";
import { User, Blog, BlogInput, BlogAuthor } from "../entity";
import { blogSchema, blogInputSchema } from "../schemas/blog";
import authenticate from "../hooks/onRequest/authentication";
import camelcaseKeys from "camelcase-keys";

@Controller({ route: "/blogs" })
export default class BlogController {
  constructor(
    private blogService: BlogService,
    private adminService: AdminService,
  ) {}

  @GET({
    url: "/:id",
    options: {
      schema: {
        params: { type: "object", properties: { id: { type: "string" } } },
        response: { 200: blogSchema },
      },
    },
  })
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>
  ): Promise<Blog> {
    const blog = await this.blogService.getById(req.params.id);

    if (!blog) throw { statusCode: 404, message: "Entity not found" };
    return blog;
  }

  @GET({
    url: "/",
    options: {
      schema: {
        response: { 200: { type: "array", items: blogSchema } },
      },
    },
  })
  async getAll(
    req: FastifyRequest<{ Querystring: { limit: number; offset: number } }>
  ): Promise<Blog[]> {
    const limit = req.query.limit || 6;
    const offset = req.query.offset || 0;
    return this.blogService.getAll(offset, limit);
  }

  @POST({
    url: "/",
    options: {
      schema: {
        body: blogInputSchema,
        response: { 200: blogSchema },
      },
      onRequest: authenticate,
    },
  })
  async createOrUpdate(
    req: AuthenticatedRequest<{
      Body: BlogInput;
      User: Record<string, unknown>;
    }>
  ): Promise<BlogAuthor> {
    const user = req.user?.user as User;
    const admin = await this.adminService.getById(user.id);
    if (!admin) throw { statusCode: 404, message: "Admin not found" };

    const blog = await this.blogService.store(
      camelcaseKeys({
        // @ts-ignore
        adminId: user.id,
        ...req.body,
      })
    );

    return {
      ...blog,
      author: {
        id: admin.id,
        name: admin.name,
      }
    }
  }
}
