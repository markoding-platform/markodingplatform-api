import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen(8080, (err, address) => {
  if (err) {
    console.log(err)

    process.exit(1)
  }

  console.log(`Server is listening at ${address}`)
})