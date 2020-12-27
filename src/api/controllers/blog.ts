import { FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";

import BlogService from "../services/blog";
import { Blog, BlogInput } from "../entity/blog";
import { blogSchema, blogInputSchema } from "../schemas/blog";

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
    },
  })
  async createOrUpdate(
    req: FastifyRequest<{ Body: BlogInput }>
  ): Promise<Blog> {
    return await this.service.store(req.body);
  }
}
