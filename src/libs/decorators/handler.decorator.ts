/* eslint-disable no-unused-vars */
import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export type HTTPMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type HandlerSchemas = 'body' | 'querystring' | 'params' | 'response'

export type LifeCycles = 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization'
  | 'onSend' | 'onResponse' | 'onRequest' | 'onTimeout' | 'onError'

export type GenericHookFunc = (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>

export type PayloadHookFunc = (request: FastifyRequest, reply: FastifyRequest, payload: unknown)
  => Promise<unknown>

export type ErrorHookFunc = (request: FastifyRequest, reply: FastifyReply, error: unknown)
  => Promise<unknown>

export enum HandlerMetadataKeys {
  HTTPMethod = 'HTPPMethod',
  RoutePath = 'RoutePath',
  BodySchema = 'BodySchema',
  QuerystringSchema = 'QuerystringSchema',
  ParamsSchema = 'ParamsSchema',
  ResponseSchema = 'ResponseSchema',
  RoutePrefix = 'RoutePrefix'
}

function normalizeUrl (urlStr: string): string {
  const firstChar = urlStr[0]
  const lastChar = urlStr[urlStr.length - 1]

  if (firstChar !== '/') urlStr = '/' + urlStr
  if (lastChar === '/') urlStr = urlStr.slice(0, urlStr.length - 1)

  return urlStr
}

function httpMethodDecoratorFactory (method: HTTPMethods): Function {
  return function routeMethodDecorator (path: string): Function {
    return function decorator (target: Function, key: string): void {
      Reflect.defineMetadata(
        HandlerMetadataKeys.RoutePath,
        normalizeUrl(path),
        target,
        key
      )
      Reflect.defineMetadata(
        HandlerMetadataKeys.HTTPMethod,
        method,
        target,
        key
      )
    }
  }
}

function useSchemaDecoratorFactory (schemaName: HandlerSchemas): Function {
  return function useSchemaDecorator (schema: unknown): Function {
    return function decorator (target: Function, key: string): void {
      let schemaType: string = ''

      switch (schemaName) {
        case 'body':
          schemaType = HandlerMetadataKeys.BodySchema
          break
        case 'params':
          schemaType = HandlerMetadataKeys.ParamsSchema
          break
        case 'querystring':
          schemaType = HandlerMetadataKeys.QuerystringSchema
          break
        case 'response':
          schemaType = HandlerMetadataKeys.ResponseSchema
          break
      }

      Reflect.defineMetadata(
        schemaType,
        schema,
        target,
        key
      )
    }
  }
}

function useHookDecoratorFactory<T> (cylce: LifeCycles): Function {
  return function useHookDecorator (hook: T): Function {
    return function decorator (target: Function, key: string): void {
      Reflect.defineMetadata(
        cylce,
        hook,
        target,
        key
      )
    }
  }
}

export const get = httpMethodDecoratorFactory('GET')
export const post = httpMethodDecoratorFactory('POST')
export const patch = httpMethodDecoratorFactory('PATCH')
export const put = httpMethodDecoratorFactory('PUT')
export const del = httpMethodDecoratorFactory('DELETE')

export const bodySchema = useSchemaDecoratorFactory('body')
export const querySchema = useSchemaDecoratorFactory('querystring')
export const paramsSchema = useSchemaDecoratorFactory('params')
export const responseSchema = useSchemaDecoratorFactory('response')

export const onRequest = useHookDecoratorFactory('onRequest')
export const preValidation = useHookDecoratorFactory('preValidation')
export const preHandler = useHookDecoratorFactory('preHandler')
export const onResponse = useHookDecoratorFactory('onResponse')
export const onTimeout = useHookDecoratorFactory('onTimeout')

export const preParsing = useHookDecoratorFactory<PayloadHookFunc>('preParsing')
export const preSerialization = useHookDecoratorFactory<PayloadHookFunc>('preSerialization')
export const onSend = useHookDecoratorFactory<PayloadHookFunc>('onSend')

export const onError = useHookDecoratorFactory<ErrorHookFunc>('onError')

export function handler (prefix: string): Function {
  return function decorator (target: Function): void {
    Reflect.defineMetadata(
      HandlerMetadataKeys.RoutePrefix,
      normalizeUrl(prefix),
      target.prototype
    )
  }
}
