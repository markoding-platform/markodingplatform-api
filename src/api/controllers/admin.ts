import {FastifyRequest} from 'fastify';
import {Controller, POST} from 'fastify-decorators';
import bcrypt from 'bcryptjs';

import AdminService from '../services/admin';
import {Admin, AdminInput} from '../entity/admin';
import {adminSchema, adminInputSchema} from '../schemas/admin';

@Controller({route: '/admins'})
export default class AdminController {
  constructor(private service: AdminService) {}

  @POST({
    url: '/',
    options: {
      schema: {
        body: adminInputSchema,
        response: {200: adminSchema},
      },
    },
  })
  async create(req: FastifyRequest<{Body: AdminInput}>): Promise<Admin> {
    return this.service.store({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
    });
  }
}
