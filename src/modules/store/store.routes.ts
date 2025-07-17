import { FastifyInstance } from 'fastify';
import { registerChamadoController } from './store.controller';
import { authGuard, authRedisToken, verifyLojaRole } from '@/middlewares/authGuard';


export async function storeRoutes(fastify: FastifyInstance) {
    fastify.post('/api/v1/store/chamado', {
        preHandler: [authGuard, verifyLojaRole, authRedisToken],
        handler: registerChamadoController,
    });
}