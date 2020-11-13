import { FastifyInstance } from 'fastify'

import api from '../api'

export async function routes (instance: FastifyInstance) {
  instance.register(api)
  instance.get('/ping', async () => 'pong\n')
}
