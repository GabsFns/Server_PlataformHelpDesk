// websocket/index.ts
import { FastifyPluginAsync } from 'fastify';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { registerSocketEvents } from './events';

let io: Server; // Exportado depois de inicializado

const socketPlugin: FastifyPluginAsync = async (fastify) => {
  const httpServer = createServer(fastify.server); // Usa o servidor já existente do Fastify

  io = new Server(httpServer, {
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

  // Escuta em uma porta diferente (por exemplo, 3001)
  httpServer.listen(3001, () => {
    console.log('Socket.IO rodando na porta 3001');
  });
};

export { socketPlugin, io };