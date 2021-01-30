import {FastifyRequest} from 'fastify';
import {AuthQuerystring} from 'schemas';
import {Controller, POST} from 'fastify-decorators';

import {SSORequest} from '../entity';
import {authQuerySchema, authResponseSchema} from '../schemas/auth';
import {
  IdeaUserService,
  AuthService,
  UserService,
  UserPointService,
} from '../services';

const {DEBUGGABLE = false} = process.env;

@Controller({route: '/auth'})
class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ideaUserService: IdeaUserService,
    private userPointService: UserPointService,
  ) {}

  @POST({
    url: '/start',
    options: {
      schema: {
        querystring: authQuerySchema,
      },
    },
  })
  async start(
    request: FastifyRequest<{Querystring: AuthQuerystring}>,
  ): Promise<SSORequest> {
    if (request.query.debug && Boolean(DEBUGGABLE)) {
      const newNonce = await this.authService.generateNonce();
      const payload = this.authService.signNonceDebug(
        newNonce.nonce,
        request.query.id,
        request.query.email,
        request.query.isEmailVerified,
        request.query.name,
      );

      return payload;
    }

    const newNonce = await this.authService.generateNonce();
    const payload = this.authService.signNonce(newNonce.nonce);

    return payload;
  }

  @POST({
    url: '/finish',
    options: {
      schema: {
        response: {
          200: authResponseSchema,
        },
      },
    },
  })
  async finish(
    req: FastifyRequest<{Body: {sso: string; sig: string}}>,
  ): Promise<{token: string; data: unknown}> {
    const {sso, sig} = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};

    if (!this.authService.verifySSO(sso, sig)) {
      throw {statusCode: 403, message: 'forbidden'};
    }

    const payload = this.authService.decodeSSO(sso);

    if (!(await this.authService.validateNonce(payload.nonce))) {
      throw {statusCode: 403, message: 'please login again'};
    }

    const user = await this.userService.findOrCreate({
      name: payload.name,
      email: payload.email,
      externalId: payload.id,
      isEmailVerified: payload.isEmailVerified,
    });

    await this.userPointService.addUserPoint(user.id, 'login');

    const profile = user.profile;

    Reflect.deleteProperty(user, 'profile');

    data.user = user;

    if (profile) {
      const ideaUser = await this.ideaUserService.getIdeaByUser(user);

      data.profile = profile;
      data.idea = ideaUser?.idea || null;
    } else {
      data.profile = null;
      data.idea = null;
    }

    return {
      token: this.authService.generateJWT({user, profile}),
      data,
    };
  }
}

export default AuthController;
