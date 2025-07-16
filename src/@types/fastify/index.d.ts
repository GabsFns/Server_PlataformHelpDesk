import { PrismaClient } from '../../../prisma/generated/client'
import { JWT } from '@fastify/jwt'
import { Redis } from 'ioredis'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    jwt: JWT
    redis: Redis
  }
}c