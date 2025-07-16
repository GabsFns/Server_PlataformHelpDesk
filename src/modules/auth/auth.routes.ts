import { FastifyInstance } from 'fastify';
import { registerController, loginController, logoutController, createTokenController } from './auth.controller';
import { cadastroSchema, loginSchema } from './auth.schema';
import { authGuard, authRedisToken } from '../../middlewares/authGuard';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/api/v1/auth/register', {
        schema: cadastroSchema,
        handler: registerController,
    });

    fastify.post('/api/v1/auth/login', {
        schema: loginSchema,
        handler: loginController,
    });

    fastify.get('/api/v1/auth/logout', {
        preHandler: authRedisToken,
        handler: logoutController
    });

    fastify.post('/api/v1/auth/token', createTokenController);
}