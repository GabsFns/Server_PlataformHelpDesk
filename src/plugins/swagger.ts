import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import swaggerConfig from '../config/swagger.config';

export async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifySwagger, swaggerConfig);

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    uiConfig: {
      docExpansion: 'list',
    },
    transformStaticCSP: (header) => header,
  });
}
