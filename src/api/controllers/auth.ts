import { FastifyRequest } from "fastify";
import { Controller, POST } from "fastify-decorators";

import AuthService from "../services/auth";
import UserService from "../services/user";
import { SSORequest } from "../entity";

@Controller({ route: "/auth" })
class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @POST({ url: "/start" })
  async start(req: FastifyRequest): Promise<SSORequest> {
    const newNonce = await this.authService.generateNonce();
    const payload = this.authService.signNonce(newNonce.nonce);

    return payload;
  }

  @POST({ url: "/finish" })
  async finish(
    req: FastifyRequest<{ Querystring: { sso: string; sig: string } }>
  ): Promise<{ token: string; data: any }> {
    const { sso, sig } = req.query;

    if (!this.authService.verifySSO(sso, sig)) {
      throw { statusCode: 403, message: "forbidden " };
    }

    const payload = this.authService.decodeSSO(sso);

    if (!(await this.authService.validateNonce(payload.nonce))) {
      throw { statusCode: 403, message: "please login again" };
    }

    const user = this.userService.findOrCreate({
      name: payload.name,
      email: payload.name,
    });

    return {
      token: this.authService.generateJWT(payload),
      data: { user },
    };
  }
}

export default AuthController;
