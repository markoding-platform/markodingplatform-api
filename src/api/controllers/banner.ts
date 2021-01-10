import camelcaseKeys from 'camelcase-keys';
import {FastifyRequest} from 'fastify';
import {Controller, GET, POST, PATCH, PUT} from 'fastify-decorators';

import BannerService from '../services/banner';
import {Banner, BannerInput} from '../entity/banner';
import {
  bannerSchema,
  bannerInputSchema,
  bannerUpdateSchema,
} from '../schemas/banner';
import {commonParams} from '../schemas/common';

@Controller({route: '/banners'})
export default class BannerController {
  constructor(private service: BannerService) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        response: {200: bannerSchema},
      },
    },
  })
  async getById(req: FastifyRequest<{Params: {id: string}}>): Promise<Banner> {
    const banner = await this.service.getById(req.params.id);
    if (!banner) throw {statusCode: 404, message: 'Entity not found'};

    return banner;
  }

  @GET({
    url: '/',
    options: {
      schema: {
        response: {200: {type: 'array', items: bannerSchema}},
      },
    },
  })
  async getAll(): Promise<Banner[]> {
    return this.service.getAll();
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: bannerInputSchema,
        response: {200: bannerSchema},
      },
    },
  })
  async create(req: FastifyRequest<{Body: BannerInput}>): Promise<Banner> {
    if (req.body.sort) {
      const banner = await this.service.getOne({
        sort: req.body.sort,
        isActive: true,
      });
      if (banner) throw {statusCode: 400, message: 'Sort already used.'};
    }

    return this.service.store(req.body);
  }

  @PATCH({
    url: '/:id/inactive',
    options: {
      schema: {
        params: commonParams,
        response: {200: bannerSchema},
      },
    },
  })
  async inactive(req: FastifyRequest<{Params: {id: string}}>): Promise<Banner> {
    const banner = await this.service.getById(req.params.id);
    if (!banner) throw {statusCode: 404, message: 'Entity not found'};

    let updated = await this.service.update(req.params.id, {
      isActive: false,
    });
    updated = camelcaseKeys(updated, {deep: true});

    return updated;
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        params: commonParams,
        body: bannerUpdateSchema,
        response: {200: bannerSchema},
      },
    },
  })
  async update(
    req: FastifyRequest<{
      Params: {id: string};
      Body: BannerInput;
    }>,
  ): Promise<Banner> {
    const banner = await this.service.getById(req.params.id);
    if (!banner) throw {statusCode: 404, message: 'Entity not found'};

    let updated = await this.service.update(req.params.id, req.body);
    updated = camelcaseKeys(updated, {deep: true});

    return updated;
  }
}
