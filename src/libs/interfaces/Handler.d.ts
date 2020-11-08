import { FastifyRequest } from 'fastify'

export interface UserReqParams extends FastifyRequest {
  params: {
    id: number
  }
}

export interface UserReqBody extends FastifyRequest {
  body: {
    name: string
    email: string
  }
}
