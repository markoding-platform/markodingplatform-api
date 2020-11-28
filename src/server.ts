import 'reflect-metadata'
import fastify from 'fastify'
import { bootstrap } from 'fastify-decorators';

import IdeaController from './api/controllers/idea.controller'

// import routes from './config/routes'

const server = fastify()

// server.register(routes)

server.register(bootstrap, {
  controllers: [
    IdeaController,
  ]
});

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
