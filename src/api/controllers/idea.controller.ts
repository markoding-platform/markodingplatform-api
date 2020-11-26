import Idea from '../../entity/Idea'
import IdeaService from '../services/idea.service'
import { IdeaReqBody, IdeaReqParams } from '../../libs/interfaces/Controller'
import { Controller, GET, POST } from 'fastify-decorators';

@Controller({ route: '/ideas' })
export default class IdeaController {
  constructor(private service: IdeaService) {}

  @GET({ url: '/:id' })
  async getIdeaById(req: IdeaReqParams) {
    const idea = await this.service.getOneById(req.params.id)
    if (!idea) return null

    return idea
  }

  @GET({ url: '/' })
  async getAllIdeas() {
    return this.service.getAll()
  }

  @POST({ url: '/', options: {
    schema: {
      body: {
        type: "object",
        // required: ["name", "img"],
        properties: {
          schoolId: { type: "string" },
          teacherId: { type: "string" },
          solutionName: { type: "string" },
          solutionType: { type: "string" },
          probleamArea: { type: "string" },
          probleamSelection: { type: "string" },
          probleamReasoning: { type: "string" },
          solutionVision: { type: "string" },
          solutionMission: { type: "string" },
          solutionBenefit: { type: "string" },
          solutionObstacle: { type: "string" },
          solutionPitchUrl: { type: "string" },
          targetOutcomes: { type: "string" },
          targetCustomer: { type: "string" },
          potentialCollaboration: { type: "string" },
          solutionSupportingPhotos: { type: "array" },
          isDraft: { type: "boolean" },
        },
      },
    }
  }})
  async createIdea(req: IdeaReqBody) {
    let idea = new Idea()
    idea.schoolId = req.body.schoolId
    idea.teacherId = req.body.teacherId
    idea.solutionName = req.body.solutionName
    idea.solutionType = req.body.solutionType
    idea.problemArea = req.body.problemArea
    idea.problemSelection = req.body.problemSelection
    idea.problemReasoning = req.body.problemReasoning
    idea.solutionVision = req.body.solutionVision
    idea.solutionMission = req.body.solutionMission
    idea.solutionBenefit = req.body.solutionBenefit
    idea.solutionObstacle = req.body.solutionObstacle
    idea.solutionPitchUrl = req.body.solutionPitchUrl
    idea.targetOutcomes = req.body.targetOutcomes
    idea.targetCustomer = req.body.targetCustomer
    idea.potentialCollaboration = req.body.potentialCollaboration
    idea.solutionSupportingPhotos = req.body.solutionSupportingPhotos
    idea.isDraft = req.body.isDraft

    return this.service.createOne(idea)
  }
}
