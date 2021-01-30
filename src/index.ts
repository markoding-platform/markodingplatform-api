import 'reflect-metadata';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import {bootstrap} from 'fastify-decorators';
import fastifyMultipart from 'fastify-multipart';

import {
  UserController,
  LeaderboardUserController,
} from './api/controllers/user';
import {
  IdeaController,
  LeaderboardTeamController,
} from './api/controllers/idea';
import IdeaUserController from './api/controllers/ideaUser';
import IdeaLikeController from './api/controllers/ideaLike';
import IdeaCommentController from './api/controllers/ideaComment';
import EventController from './api/controllers/event';
import BlogController from './api/controllers/blog';
import BannerController from './api/controllers/banner';
import AuthController from './api/controllers/auth';
import AnnouncementController from './api/controllers/announcement';
import ChannelController from './api/controllers/channel';
import QuestionController from './api/controllers/question';
import QuestionCommentController from './api/controllers/questionComment';
import QuestionLikeController from './api/controllers/questionLike';
import ChatController from './api/controllers/chat';
import UploadController from './api/controllers/upload';
import ProfileController from './api/controllers/profile';
import SearchController from './api/controllers/search';

const {APP_PORT = 8080, APP_HOST = '0.0.0.0'} = process.env;

const server = fastify({logger: true});
server.decorateRequest('user', null);
server.register(fastifyMultipart);
server.register(fastifyCors, {
  origin: '*',
});
server.register(bootstrap, {
  controllers: [
    LeaderboardUserController,
    LeaderboardTeamController,
    IdeaController,
    IdeaUserController,
    IdeaLikeController,
    IdeaCommentController,
    EventController,
    BlogController,
    BannerController,
    AuthController,
    AnnouncementController,
    ChannelController,
    QuestionController,
    QuestionCommentController,
    QuestionLikeController,
    ChatController,
    UploadController,
    ProfileController,
    UserController,
    SearchController,
  ],
});

server.listen(APP_PORT, APP_HOST, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(`Server listening at ${address}`);
});
