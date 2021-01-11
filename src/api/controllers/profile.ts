import {Controller, GET, POST} from 'fastify-decorators';

import ProfileService from '../services/profile';
import AuthService from '../services/auth';
import {Profile, ProfileInput} from '../entity';
import {profileSchema, profileInputSchema} from '../schemas/profile';
import authenticate from '../hooks/onRequest/authentication';
import {authResponseSchema} from '../schemas/auth';

@Controller({route: '/profile'})
export default class ProfileController {
  constructor(
    private service: ProfileService,
    private authService: AuthService,
  ) {}

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: {type: 'object', properties: {id: {type: 'string'}}},
        response: {200: profileSchema},
      },
      onRequest: authenticate,
    },
  })
  async getById(
    req: AuthenticatedRequest<{Params: {id: string}}>,
  ): Promise<Profile> {
    const profile = await this.service.getById(req.params.id);

    if (!profile) throw {statusCode: 404, message: 'profile not found'};
    return profile;
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: profileInputSchema,
        response: {200: authResponseSchema},
      },
      onRequest: authenticate,
    },
  })
  async upsert(
    req: AuthenticatedRequest<{
      Body: ProfileInput;
    }>,
  ): Promise<{token: string; data: unknown}> {
    const user = req.user.user;

    let profile: Profile;

    if (!req.user.profile) {
      profile = await this.service.store(user.id, req.body);
    } else {
      profile = await this.service.update(req.user.profile.id, req.body);
    }

    return {
      token: this.authService.generateJWT({user, profile}),
      data: {user, profile},
    };
  }
}
