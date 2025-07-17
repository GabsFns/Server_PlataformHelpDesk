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
  let user;
  try {
    user = JSON.parse(socket.handshake.query.user as string);
  } catch (error) {
    console.error('Erro ao fazer parse do usuário');
    socket.disconnect();
    return;
  }

  if (!user) {
    console.error('Usuário não fornecido na conexão do socket');
    socket.disconnect();
    return;
  }

  if (user.tipo === 'LOJA' && user.lojaId) {
    socket.join(`loja:${user.lojaId}`);
    console.log(`Usuário LOJA conectado: ${user.lojaId}`);
  } else if (user.tipo === 'SETOR' && user.setorId) {
    socket.join(`setor:${user.setorId}`);
    console.log(`Usuário SETOR conectado: ${user.setorId}`);
  }

  registerSocketEvents(socket);

});

export { app, httpServer }