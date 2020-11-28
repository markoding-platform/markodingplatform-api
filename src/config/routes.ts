import { FastifyInstance } from "fastify";
import { bootstrap } from "fastify-decorators";
import { resolve } from "path";

export default function routes(instance: FastifyInstance): void {
  instance.register(bootstrap, {
    directory: resolve(__dirname, "../api/controllers"),
    mask: /\.controller\./,
  });
}
