import { Server } from 'socket.io';
import { createServer } from 'http';
import fastify from 'fastify';
import { registerSocketEvents } from './events';

const app = fastify();
const httpServer = createServer(app.server);

export const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  registerSocketEvents(socket);
});

export { app, httpServer }