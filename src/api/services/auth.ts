import crypto from "crypto";
import querystring from "querystring";
import jwt from "jsonwebtoken";
import { Buffer } from "buffer";
import { Initializer, Service } from "fastify-decorators";
import { Repository } from "typeorm";
import { addMinutes } from "date-fns";

import Database from "../../config/database";
import { Nonce, SSORequest, SSOResponse } from "../entity";

const { NONCE_EXP_MIN, SSO_SECRET, JWT_SECRET } = process.env;

@Service()
class AuthService {
  private repository!: Repository<Nonce>;

  constructor(private database: Database) {}

  @Initializer([Database])
  async init(): Promise<void> {
    this.repository = this.database.connection.getRepository(Nonce);
  }

  async generateNonce(): Promise<Nonce> {
    const data = new Nonce();

    data.expiredAt = addMinutes(new Date(), Number(NONCE_EXP_MIN));
    data.nonce = crypto.randomBytes(16).toString("hex");

    return this.repository.save(data);
  }

  async validateNonce(nonceStr: string): Promise<boolean> {
    const nonce = await this.repository
      .createQueryBuilder()
      .where("nonce = :nonce AND expired_at > :expiredAt", {
        nonce: nonceStr,
        expiredAt: new Date(),
      })
      .getOne();

    return nonce !== undefined;
  }

  generateJWT(payload: AuthenticatedRequestPayload): string {
    return jwt.sign(payload, JWT_SECRET as string);
  }

  signNonce(nonceStr: string): SSORequest {
    const rawPayload = `nonce=${nonceStr}`;
    const payloadBase64 = Buffer.from(rawPayload, "utf-8").toString("base64");
    const hmac = crypto.createHmac("SHA256", SSO_SECRET as string);

    hmac.update(payloadBase64);

    return {
      sso: payloadBase64,
      sig: hmac.digest("hex"),
    };
  }

  signNonceDebug(
    nonceStr: string,
    id: number,
    email: string,
    isEmailVerified: boolean,
    name: string
  ): SSORequest {
    // eslint-disable-next-line max-len
    const rawPayload = `nonce=${nonceStr}&id=${id}&email=${email}&isEmailVerified=${isEmailVerified}&name=${name}`;
    const payloadBase64 = Buffer.from(rawPayload, "utf-8").toString("base64");
    const hmac = crypto.createHmac("SHA256", SSO_SECRET as string);

    hmac.update(payloadBase64);

    return {
      sso: payloadBase64,
      sig: hmac.digest("hex"),
    };
  }

  verifySSO(ssoStr: string, sigStr: string): boolean {
    const hmac = crypto.createHmac("SHA256", SSO_SECRET as string);

    hmac.update(ssoStr);

    return hmac.digest("hex") === sigStr;
  }

  decodeSSO(ssoStr: string): SSOResponse {
    const converted = Buffer.from(ssoStr, "base64").toString("utf-8");
    const decoded = querystring.parse(converted);

    return {
      nonce: decoded["nonce"] as string,
      id: decoded["id"] as string,
      email: decoded["email"] as string,
      isEmailVerified: (decoded["isEmailVerified"] as string) === "true",
      name: decoded["name"] as string,
    };
  }
}

export default AuthService;
