import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify(); // Valida o token e injeta request.user
  } catch {
    return reply.status(401).send({ message: "Não autorizado." });
  }
}
