import {Controller, GET, POST, PATCH, PUT} from 'fastify-decorators';

import {BadgeService} from '../services';

@Controller({route: '/badges'})
export default class BadgeController {
  constructor(private service: BadgeService) {}

  // @GET({})
}
