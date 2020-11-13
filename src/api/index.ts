import { join } from 'path'
import { FastifyInstance } from 'fastify'

import { UserHandler, IdeaHandler } from './handlers'
import { HandlerMetadataKeys, HTTPMethods } from '../libs/decorators/handler.decorator'

export default async function api (instance: FastifyInstance) {
  Object.getOwnPropertyNames(IdeaHandler.prototype).forEach((methodName: string) => {
    if (methodName !== 'constructor' && typeof IdeaHandler.prototype[methodName] === 'function') {
      const method: HTTPMethods = Reflect.getMetadata(
        HandlerMetadataKeys.HTTPMethod,
        IdeaHandler.prototype,
        methodName
      )
      const routePrefix = Reflect.getMetadata(
        HandlerMetadataKeys.RoutePrefix,
        IdeaHandler.prototype
      )
      const routePath = Reflect.getMetadata(
        HandlerMetadataKeys.RoutePath,
        IdeaHandler.prototype,
        methodName
      )
      const handlerFunc = IdeaHandler.prototype[methodName]

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
