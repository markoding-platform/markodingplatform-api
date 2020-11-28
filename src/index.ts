import "reflect-metadata";
import fastify from "fastify";

import routes from "./config/routes";

const PORT = 8080;
const ADDRESS = "0.0.0.0";

const server = fastify();
server.register(routes);
server.listen(PORT, ADDRESS, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Server listening at ${address}`);
});
