import fastify from "fastify";
import { Server } from "socket.io"
import  prismaPlugin  from "./plugins/prisma";
import appRoutes from "./routes";
import jwtPlugin from "./plugins/jwt";
import redisPlugin from "./plugins/redis";
const app = fastify();

const io = new Server(app.server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id);

  socket.on('joinRoom', (room) => {
    console.log(`Entrou na sala ${room}`);
    socket.join(room);
  });
});

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
