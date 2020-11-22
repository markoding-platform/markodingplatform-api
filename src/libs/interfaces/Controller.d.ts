import { FastifyRequest } from 'fastify'

import { SolutionType } from '../types'

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
    schoolId: string
    teacherId: string
    solutionName: string
    solutionType: SolutionType
    problemArea: string
    problemSelection: string
    problemReasoning: string
    solutionVision: string
    solutionMission: string
    solutionBenefit: string
    solutionObstacle: string
    solutionPitchUrl: string
    targetOutcomes: string
    targetCustomer: string
    potentialCollaboration: string
    solutionSupportingPhotos: string[]
    isDraft: boolean
  }
}
