import camelcaseKeys from 'camelcase-keys';
import {Controller, GET, POST, PUT} from 'fastify-decorators';

import AnnouncementService from '../services/announcement';
import {Announcement, AnnouncementInput} from '../entity';
import {
  announcementSchema,
  announcementInputSchema,
} from '../schemas/announcement';
import {commonParams} from '../schemas/common';
import authenticate from '../hooks/onRequest/authentication';

@Controller({route: '/announcements'})
export default class AnnouncementController {
  constructor(private service: AnnouncementService) {}

  @GET({
    url: '/count',
    options: {
      schema: {
        response: {200: {type: 'number'}},
      },
      onRequest: authenticate,
    },
  })
  async getByUserCount(req: AuthenticatedRequest): Promise<number> {
    const user = req.user.user;
    return this.service.getByUserCount(user.id);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: announcementSchema},
      },
      onRequest: authenticate,
    },
  })
  async getById(
    req: AuthenticatedRequest<{Params: {id: string}}>,
  ): Promise<Announcement> {
    const announcement = await this.service.getById(req.params.id);
    if (!announcement) throw {statusCode: 404, message: 'Entity not found'};

    return announcement;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        response: {200: {type: 'array', items: announcementSchema}},
      },
      onRequest: authenticate,
    },
  })
  async getByUser(req: AuthenticatedRequest): Promise<Announcement[]> {
    const user = req.user.user;
    return this.service.getByUser(user.id);
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: announcementInputSchema,
        response: {200: announcementSchema},
      },
      onRequest: authenticate,
    },
  })
  async create(
    req: AuthenticatedRequest<{Body: AnnouncementInput}>,
  ): Promise<Announcement> {
    return this.service.store(req.body);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        body: announcementInputSchema,
        response: {200: announcementSchema},
      },
      onRequest: authenticate,
    },
  })
  async update(
    req: AuthenticatedRequest<{
      Params: {id: string};
      Body: AnnouncementInput;
    }>,
  ): Promise<Announcement> {
    const announcement = await this.service.getById(req.params.id);
    if (!announcement) throw {statusCode: 404, message: 'Entity not found'};

    let updated = await this.service.update(req.params.id, req.body);
    updated = camelcaseKeys(updated, {deep: true});

    return updated;
  }
}
