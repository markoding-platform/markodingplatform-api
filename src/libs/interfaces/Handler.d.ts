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

export interface IdeaReqParams extends FastifyRequest {
  params: {
    id: number
  }
}

export interface IdeaReqBody extends FastifyRequest {
  body: {
    teamId: string
    problem: string
    solution: string
  }
}