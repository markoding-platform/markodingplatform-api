import { FastifyInstance } from 'fastify'
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path'

export default function routes(instance: FastifyInstance) {
  instance.register(bootstrap, {
    directory: resolve(__dirname, '../api/controllers'),
    mask: /\.controller\./,
  })
  instance.get('/ping', async () => 'pong\n')
}
