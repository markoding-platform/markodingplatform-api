import Idea from '../../models/Idea'
import { ideaService } from '../services'
import { handler, get, post } from '../../libs/decorators/handler.decorator'
import { IdeaReqBody, IdeaReqParams } from '../../libs/interfaces/Handler'

@handler('/ideas')
class IdeaHandler {
  @get('/:id')
  async getIdeaById(request: IdeaReqParams) {
    const idea = await ideaService.getOneIdeaById(request.params.id)
    if (!idea) return null

    return idea
  }

  @get('/')
  async getIdea() {
    return ideaService.getAllIdeas()
  }

  @post('/')
  async createIdea(request: IdeaReqBody) {
    let idea = new Idea()
    idea.teamId = request.body.teamId
    idea.problem = request.body.problem
    idea.solution = request.body.solution

    return ideaService.createIdea(idea)
  }
}

export default IdeaHandler