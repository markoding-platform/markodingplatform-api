import { FastifyReply, FastifyRequest } from 'fastify'

import User from '../../models/User'
import { handler, get, post } from '../../libs/decorators/handler.decorator'
import { userService } from '../services'

interface UserReqParams extends FastifyRequest {
  params: {
    id: number
  }
}

interface UserReqBody extends FastifyRequest {
  body: {
    name: string
    email: string
  }
}

@handler('/users')
class UserHandler {
  @get('/:id')
  async getUserById (request: UserReqParams, reply: FastifyReply) {
    const user = await userService.getOneUserById(request.params.id)

    if (!user) return null

    return user
  }

  @get('/')
  async getUsers (request: FastifyRequest, reply: FastifyReply) {
    const users = await userService.getAllUsers()

    return users
  }

  @post('/')
  async createUser (request: UserReqBody, reply: FastifyReply) {
    let user = new User()

    user.name = request.body.name
    user.email = request.body.email

    user = await userService.createUser(user)

    return user
  }
}

export default UserHandler
