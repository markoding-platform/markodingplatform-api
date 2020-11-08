import 'reflect-metadata'

import './config/database'

import fastify from 'fastify'

import { routes } from './config/routes'

const server = fastify()

server.register(routes)

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
