import { join } from 'path'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { UserHandler } from '../api/handlers'
import { HandlerMetadataKeys, HTTPMethods } from '../libs/decorators/handler.decorator'

export async function routes (instance: FastifyInstance, option: FastifyPluginOptions) {
  Object.getOwnPropertyNames(
    UserHandler.prototype
  ).forEach((methodName: string) => {
    if (methodName !== 'constructor' && typeof UserHandler.prototype[methodName] === 'function') {
      const method: HTTPMethods = Reflect.getMetadata(
        HandlerMetadataKeys.HTTPMethod,
        UserHandler.prototype,
        methodName
      )
      const routePrefix = Reflect.getMetadata(
        HandlerMetadataKeys.RoutePrefix,
        UserHandler.prototype
      )
      const routePath = Reflect.getMetadata(
        HandlerMetadataKeys.RoutePath,
        UserHandler.prototype,
        methodName
      )
      const handlerFunc = UserHandler.prototype[methodName]

      console.log(method, join(routePrefix, routePath), handlerFunc)

      switch (method) {
        case 'GET':
          instance.get(
            join(routePrefix, routePath),
            handlerFunc
          )
          break
        case 'POST':
          instance.post(
            join(routePrefix, routePath),
            handlerFunc
          )
          break
        default:
      }
    }
  })
}
