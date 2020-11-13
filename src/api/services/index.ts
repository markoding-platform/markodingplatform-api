import { userDAO, ideaDAO } from '../daos'
import UserService from './UserService'
import IdeaService from './IdeaService'

export const userService = new UserService(userDAO)
export const ideaService = new IdeaService(ideaDAO)