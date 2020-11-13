import { getConnection } from 'typeorm'
import UserDAO from './UserDAO'
import IdeaDAO from './IdeaDAO'

const DB = getConnection('connection-1')

export const userDAO = new UserDAO(DB)
export const ideaDAO = new IdeaDAO(DB)