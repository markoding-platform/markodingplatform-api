import { userDAO } from '../daos'
import UserService from './UserService'

export const userService = new UserService(userDAO)
