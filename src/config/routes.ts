import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import api from '../api'

export async function routes (instance: FastifyInstance, options: FastifyPluginOptions) {
  instance.register(api)
}
