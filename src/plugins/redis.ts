import fp from 'fastify-plugin';
import Redis from 'ioredis';

export default fp(async (fastify) => {
    const redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
    });
   fastify.decorate('redis', redis);
});

declare module 'fastify' {
    interface FastifyInstance {
        redis: Redis;
    }
}