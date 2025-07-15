import { getChannel } from '../config/rabbitmq';

export async function enviarChamadoParaFila(chamado: any) {
const channel = getChannel();
const exchangeName = 'chamados_exchange';

  try {
    const nsgBuffer = Buffer.from(JSON.stringify(chamado));
    channel.publish(exchangeName, chamado.setor, nsgBuffer, {persistent: true,})
    console.log(`Chamado enviado para a fila do setor ${chamado.setor}`);
  } catch (error) {
    console.error('Erro ao enviar chamado para a fila:', error);
    throw error;
  }
    
}