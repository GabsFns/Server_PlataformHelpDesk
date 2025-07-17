
import { getChannel } from '../config/rabbitmq';

export async function enviarChamadoParaFila(chamado: any) {
  const channel = getChannel();
  const exchangeName = 'chamados_exchange';

  try {
    const msgBuffer = Buffer.from(JSON.stringify(chamado));

    const routingKey = chamado.setor.nome.toLowerCase();

    channel.publish(exchangeName, routingKey, msgBuffer, { persistent: true });

    console.log(`Chamado enviado para a fila do setor ${routingKey}`);
  } catch (error) {
    console.error('Erro ao enviar chamado para a fila:', error);
    throw error;
  }
}

export async function enviarRespostaParaFila(resposta: any) {
  const channel = getChannel();
  const exchangeName = 'respostas_exchange';
  
  try {
    const msgBuffer = Buffer.from(JSON.stringify(resposta));

    const routingKey = resposta.loja.nome.toLowerCase();

    channel.publish(exchangeName, routingKey, msgBuffer, { persistent: true });

    console.log(`Resposta enviada para a fila do setor ${routingKey}`);
  }catch (error) {
    console.error('Erro ao enviar resposta para a fila:', error);
    throw error;
  }
}