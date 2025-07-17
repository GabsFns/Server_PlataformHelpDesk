import amqp from 'amqplib';
import { io } from '../websocket/index';

async function startGenericWorker() {
    const lojas = ['MAT', 'MAD', 'NIG'];
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'respostas_exchange';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    for (const loja of lojas) {
        const queueName = `fila_${loja}`;
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, loja); 

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const resposta = JSON.parse(msg.content.toString());
                console.log(`Reposta recebido na fila ${loja}: ${JSON.stringify(resposta)}`);

                io.to(`Loja: ${resposta.chamado.loja.nome}`).emit(`novaResposta${resposta.chamado.chamadoId}`, resposta);

                channel.ack(msg);
            }
        }, { noAck: false });
    }

    console.log('Worker genérico rodando e ouvindo chamadas de todos os setores...');
}
startGenericWorker().catch(console.error);