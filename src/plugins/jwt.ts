import fp from 'fastify-plugin'
import fastifyJwt, { JWT } from '@fastify/jwt'
import { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: JWT
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'super-secret',
  })
})