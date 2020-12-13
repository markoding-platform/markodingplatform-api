import { FastifyReply } from "fastify";

import { verifyToken } from "../../../libs/utils/token";

async function authenticate(
  request: AuthenticatedRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const token = request.headers.authorization;

    if (!token) {
      reply.status(403).send({
        message: "unauthenticated request!",
      });

      return;
    }

    request.user = await verifyToken(token);
  } catch (error) {
    reply.status(error.statusCode).send({
      message: error.message,
    });
  }
}

export default authenticate;
