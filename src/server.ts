import fastify from "fastify";
import { Server } from "socket.io"
import { createServer } from "http";

const app = fastify();
const httpServer = createServer(app.server);

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id)

  socket.on('joinRoom', (room) => {
    console.log(`Entrou na sala ${room}`)
    socket.join(room)
  })
})

httpServer.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})