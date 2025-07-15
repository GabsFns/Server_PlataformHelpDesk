import amqp from 'amqplib';

async function startWorker() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'fila_ti';
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Fila ${queueName} criada e aguardando mensagens...`);

    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            const chamado = JSON.parse(msg.content.toString());
            console.log(`Chamado recebido na fila TI: ${JSON.stringify(chamado)}`);
            // Aqui você pode processar o chamado conforme necessário
            channel.ack(msg);
        }
    }, { noAck: false });
}
startWorker().catch(console.error)