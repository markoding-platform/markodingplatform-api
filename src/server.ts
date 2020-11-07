import "reflect-metadata"; // typeorm specific requirement
import Fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = Fastify({});

server.get("/ping", async () => {
  return "pong\n";
});

const start = async () => {
  try {
    await server.listen(3000);

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;

    server.log.info(`server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

