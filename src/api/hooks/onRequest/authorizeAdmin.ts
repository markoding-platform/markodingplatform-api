import {FastifyReply} from 'fastify';

async function authorizeAdmin(
  request: AuthenticatedRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    // const userType = request.user.user.type
    // if (userType !== 'admin') {
    //   reply.code(401).send({
    //     message: 'unauthorised access!'
    //   })
    //   return
    // }
  } catch (error) {
    reply.status(error.statusCode).send({
      message: error.message,
    });
  }
}

export default authorizeAdmin;
