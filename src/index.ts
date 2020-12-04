import "reflect-metadata";
import fastify from "fastify";
import { bootstrap } from "fastify-decorators";

import IdeaController from "./api/controllers/idea";
import TeamController from "./api/controllers/team";
import EventController from "./api/controllers/event";

const PORT = 8080;
const ADDRESS = "0.0.0.0";

const server = fastify();

server.register(bootstrap, {
  controllers: [IdeaController, TeamController, EventController],
});

server.listen(PORT, ADDRESS, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Server listening at ${address}`);
});
