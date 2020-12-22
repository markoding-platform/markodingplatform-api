import "reflect-metadata";
import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { bootstrap } from "fastify-decorators";

import IdeaController from "./api/controllers/idea";
import TeamController from "./api/controllers/team";
import EventController from "./api/controllers/event";
import BlogController from "./api/controllers/blog";
import BannerController from "./api/controllers/banner";
import AuthController from "./api/controllers/auth";
import AnnouncementController from "./api/controllers/announcement";
import ChannelController from "./api/controllers/channel";
import QuestionController from "./api/controllers/question";
import QuestionCommentController from "./api/controllers/questionComment";
import QuestionLikeController from "./api/controllers/questionLike";

const { APP_PORT, APP_HOST } = process.env;

const PORT = APP_PORT || 8080;
const ADDRESS = APP_HOST || "0.0.0.0";

const server = fastify();

server.decorateRequest("user", null);

server.register(fastifyCors, {
  origin: "*",
});

server.register(bootstrap, {
  controllers: [
    IdeaController,
    TeamController,
    EventController,
    BlogController,
    BannerController,
    AuthController,
    AnnouncementController,
    ChannelController,
    QuestionController,
    QuestionCommentController,
    QuestionLikeController,
  ],
});

server.listen(PORT, ADDRESS, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Server listening at ${address}`);
});
