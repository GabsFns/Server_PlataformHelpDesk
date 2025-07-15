import amqp from 'amqplib';

let channel: amqp.Channel | null = null;

export async function connectionRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();

    const exchangeName = 'chamados_exchange';
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    const setores = ['financeiro', 'suporte', 'gerencia', 'ti', 'rh'];

    for (const setor of setores) {
        const queueName = `fila_${setor}`;
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, setor);
    }
    console.log('Conexão com RabbitMQ estabelecida e filas criadas');

} catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

export function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel não inicializado')
  return channel
}