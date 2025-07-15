import { Socket } from "socket.io";

export function registerSocketEvents(socket: Socket) {
    socket.on('joinRoom', (room: string) => {
        console.log(`Cliente ${socket.id} entrou na sala: ${room}`);
        socket.join(room);
    });

    socket.on('leaveRoom', (room: string) => {
        console.log(`Cliente ${socket.id} saiu da sala: ${room}`);
        socket.leave(room);
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
}
