import { FastifyRequest, FastifyReply } from "fastify";

interface JwtPayload {
  id: string;
}

export async function authGuard(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}


export async function authRedisToken(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: "Token Ausente" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return reply.status(401).send({ error: "Token Inválido" });
    }

    const decoded = req.server.jwt.verify(token) as JwtPayload;

    const redisToken = await req.server.redis.get(`token:${decoded.id}`);
    if (!redisToken || redisToken !== token) {
      return reply.status(401).send({ error: "Token Inválido" });
    }

  } catch (error) {
    return reply.status(401).send({ error: "Acesso não autorizado" });
  }
}