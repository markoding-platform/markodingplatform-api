/* eslint-disable no-unused-vars */
import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import 'reflect-metadata'

export type HTTPMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type HandlerSchemas = 'body' | 'querystring' | 'params' | 'response'

export type LifeCycles = 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization'
  | 'onSend' | 'onResponse'

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
  ResponseSchema = 'ResponseSchema'
}

function normalizeUrl (urlStr: string): string {
  const firstChar = urlStr[0]
  const lastChar = urlStr[urlStr.length - 1]

  if (firstChar !== '/') urlStr = '/' + urlStr
  if (lastChar !== '/') urlStr = urlStr + '/'

  return urlStr
}

function httpMethodDecoratorFactory (method: HTTPMethods): Function {
  return function routeMethodDecorator (path: string): Function {
    return function decorator (target: Function, key: string): void {
      Reflect.defineMetadata(
        HandlerMetadataKeys.RoutePath,
        normalizeUrl(path),
        target.prototype,
        key
      )
      Reflect.defineMetadata(
        HandlerMetadataKeys.HTTPMethod,
        method,
        target.prototype,
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
        target.prototype,
        key
      )
    }
  }
}

// function useHookDecoratorFactory (cylce: LifeCycles): Function {
  
// }

export const get = httpMethodDecoratorFactory('GET')
export const post = httpMethodDecoratorFactory('POST')
export const patch = httpMethodDecoratorFactory('PATCH')
export const put = httpMethodDecoratorFactory('PUT')
export const del = httpMethodDecoratorFactory('DELETE')

export const bodySchema = useSchemaDecoratorFactory('body')
export const querySchema = useSchemaDecoratorFactory('querystring')
export const paramsSchema = useSchemaDecoratorFactory('params')
export const responseSchema = useSchemaDecoratorFactory('response')
