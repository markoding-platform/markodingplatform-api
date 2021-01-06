import {
  FastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import {RouteGenericInterface} from 'fastify/types/route';

declare global {
  interface AuthenticatedRequest<
    T extends RouteGenericInterface = RouteGenericInterface,
    U extends RawServerDefault = RawServerDefault,
    V extends RawRequestDefaultExpression<U> = RawRequestDefaultExpression<U>
  > extends FastifyRequest<T, U, V> {
    user?: Record<string, unknown>;
  }
}
