import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import BlogService from "../services/blog";
import { User, Blog, BlogInput } from "../entity";
import { blogSchema, blogInputSchema } from "../schemas/blog";
import authenticate from "../hooks/onRequest/authentication";
import camelcaseKeys from "camelcase-keys";

@Controller({ route: "/blogs" })
export default class BlogController {
  constructor(private service: BlogService) {}

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
    const blog = await this.service.getById(req.params.id);

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
  async getAll(): Promise<Blog[]> {
    return this.service.getAll();
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
  ): Promise<Blog> {
    const user = req.user?.user as User;
    return this.service.store(
      camelcaseKeys({
        userId: user.id,
        ...req.body,
      })
    );
  }
}
