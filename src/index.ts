import "reflect-metadata";
import fastify from "fastify";
import { bootstrap } from "fastify-decorators";

import IdeaController from "./api/controllers/idea";
import TeamController from "./api/controllers/team";
import AuthController from "./api/controllers/auth";

const { APP_PORT, APP_HOST } = process.env;

const PORT = APP_PORT || 8080;
const ADDRESS = APP_HOST || "0.0.0.0";

const server = fastify();

server.register(bootstrap, {
  controllers: [IdeaController, TeamController, AuthController],
});

server.listen(PORT, ADDRESS, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Server listening at ${address}`);
});
