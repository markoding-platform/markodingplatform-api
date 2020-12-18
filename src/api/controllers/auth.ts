import { FastifyRequest } from "fastify";
import { AuthQuerystring } from "schemas";
import { Controller, POST } from "fastify-decorators";

import AuthService from "../services/auth";
import UserService from "../services/user";
import { SSORequest } from "../entity";
import { authQuerySchema } from "../schemas/auth";

const { DEBUGGABLE = false } = process.env;

@Controller({ route: "/auth" })
class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @POST({
    url: "/start",
    options: {
      schema: {
        querystring: authQuerySchema,
      },
    },
  })
  async start(
    request: FastifyRequest<{ Querystring: AuthQuerystring }>
  ): Promise<SSORequest> {
    if (request.query.debug && Boolean(DEBUGGABLE)) {
      const newNonce = await this.authService.generateNonce();
      const payload = this.authService.signNonceDebug(
        newNonce.nonce,
        request.query.id,
        request.query.email,
        request.query.isEmailVerified,
        request.query.name
      );

      return payload;
    }

    const newNonce = await this.authService.generateNonce();
    const payload = this.authService.signNonce(newNonce.nonce);

    return payload;
  }

  @POST({ url: "/finish" })
  async finish(
    req: FastifyRequest<{ Body: { sso: string; sig: string } }>
  ): Promise<{ token: string; data: unknown }> {
    const { sso, sig } = req.body;

    if (!this.authService.verifySSO(sso, sig)) {
      throw { statusCode: 403, message: "forbidden" };
    }

    const payload = this.authService.decodeSSO(sso);

    if (!(await this.authService.validateNonce(payload.nonce))) {
      throw { statusCode: 403, message: "please login again" };
    }

    const user = await this.userService.findOrCreate({
      name: payload.name,
      email: payload.email,
      externalId: payload.id,
      isEmailVerified: payload.isEmailVerified,
    });

    return {
      token: this.authService.generateJWT({ user }),
      data: { user },
    };
  }
}

export default AuthController;
