import { FastifyInstance } from 'fastify';
import { registerController, loginController, logoutController, createTokenController } from './auth.controller';
import { cadastroSchema, loginSchema, logoutSchema, createTokenSchema} from './auth.schema';
import { authGuard, authRedisToken } from '../../middlewares/authGuard';

export async function authRoutes(fastify: FastifyInstance) {
    console.log('Registrando authRoutes...');
    fastify.post('/register', {
        schema: cadastroSchema,
        handler: registerController,
    });

    fastify.post('/login', {
        schema: loginSchema,
        handler: loginController,
    });

    fastify.get('/logout', {
        preHandler: authRedisToken,
        handler: logoutController,
        schema: logoutSchema,
    });

    fastify.post('/token', {
        handler: createTokenController,
        schema: createTokenSchema
    });
}