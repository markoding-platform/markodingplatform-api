import {
  FastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

import { User, Profile } from "../../api/entity";

declare global {
  type AuthenticatedRequestPayload = {
    user: Exclude<User, "profile">;
    profile?: Profile;
  };

  interface AuthenticatedRequest<
    T extends RouteGenericInterface = RouteGenericInterface,
    U extends RawServerDefault = RawServerDefault,
    V extends RawRequestDefaultExpression<U> = RawRequestDefaultExpression<U>
  > extends FastifyRequest<T, U, V> {
    user: AuthenticatedRequestPayload;
  }
}
