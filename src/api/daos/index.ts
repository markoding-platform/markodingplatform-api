import { getConnection } from 'typeorm'
import UserDAO from './UserDAO'

const DB = getConnection('connection-1')

export const userDAO = new UserDAO(DB)
