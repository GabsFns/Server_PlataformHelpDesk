import { FastifyInstance } from 'fastify';
import { authGuard, authRedisToken } from '@/middlewares/authGuard';
import { responseChamadaController } from './sector.controller';

export async function sectorRoutes(fastify: FastifyInstance) {
    fastify.post('/api/v1/sector/response/:id', {
        preHandler: [authGuard, authRedisToken],
        handler: responseChamadaController,
        
    });
}