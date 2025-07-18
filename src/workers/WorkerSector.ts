import amqp from 'amqplib';
import { io } from '../websocket/index';

async function startGenericWorker() {
    const setores = ['ti', 'rh', 'financeiro'];
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'chamados_exchange';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    for (const setor of setores) {
        const queueName = `fila_${setor}`;
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, setor); 

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const chamado = JSON.parse(msg.content.toString());
                console.log(`Chamado recebido na fila ${setor}: ${JSON.stringify(chamado)}`);

                io.to(setor.toUpperCase()).emit('novoChamado', chamado);

                channel.ack(msg);
            }
        }, { noAck: false });
    }

    console.log('Worker genérico rodando e ouvindo chamadas de todos os setores...');
}
startGenericWorker().catch(console.error);