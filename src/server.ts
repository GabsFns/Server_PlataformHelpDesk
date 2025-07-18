import fastify from "fastify";
import { Server } from "socket.io"
import  prismaPlugin  from "./plugins/prisma";
import appRoutes from "./routes";
import jwtPlugin from "./plugins/jwt";
import redisPlugin from "./plugins/redis";
import { swaggerPlugin } from "./plugins/swagger";
import { authRoutes } from "./modules/auth/auth.routes";
import { connectionRabbitMQ } from "./config/rabbitmq";
import { socketPlugin } from "./websocket/index";
const app = fastify();



const startServer = async () => {
  
  await app.register(jwtPlugin)
  await app.register(connectionRabbitMQ);
  await app.register(redisPlugin);
  await app.register(prismaPlugin)
  await app.register(appRoutes);
  await app.register(socketPlugin);
  await app.register(swaggerPlugin);
 
  

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
};
startServer()