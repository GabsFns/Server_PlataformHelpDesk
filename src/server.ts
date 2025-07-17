import fastify from "fastify";
import { Server } from "socket.io"
import  prismaPlugin  from "./plugins/prisma";
import appRoutes from "./routes";
import jwtPlugin from "./plugins/jwt";
import redisPlugin from "./plugins/redis";

const app = fastify();

app.register(jwtPlugin)
app.register(redisPlugin);
app.register(prismaPlugin)
app.register(appRoutes);


app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
