import { FastifyRequest } from "fastify";
import { Controller, POST } from "fastify-decorators";

import AuthService from "../services/auth";
import { SSORequest } from "../entity";

@Controller({ route: "/auth" })
class AuthController {
  constructor(private service: AuthService) {}

  @POST({ url: "/start" })
  async start(req: FastifyRequest): Promise<SSORequest> {
    const newNonce = await this.service.generateNonce();
    const payload = this.service.signNonce(newNonce.nonce);

    return payload;
  }

  @POST({ url: "/finish" })
  async finish(
    req: FastifyRequest<{ Querystring: { sso: string; sig: string } }>
  ): Promise<{ token: string }> {
    const { sso, sig } = req.query;

    if (!this.service.verifySSO(sso, sig)) {
      throw new Error("forbidden");
    }

    const payload = this.service.decodeSSO(sso);

    if (!(await this.service.validateNonce(payload.nonce))) {
      throw new Error("please login again");
    }

    return {
      token: this.service.generateJWT(payload),
    };
  }
}

export default AuthController;
