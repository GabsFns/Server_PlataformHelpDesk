import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify'
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prisma = new PrismaClient()

export default fp(async (fastify: FastifyInstance) => {
  await prisma.$connect()
  fastify.decorate('prisma', prisma)
})