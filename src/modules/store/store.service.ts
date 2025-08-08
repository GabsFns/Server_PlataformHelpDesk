import { FastifyInstance } from "fastify";
import { enviarChamadoParaFila } from "@/services/rabbitmqService";
import { io } from "../../websocket/index";
import { CreateChamadoInput } from "./store.schema";
export async function createChamado(
  fastify: FastifyInstance,
  data: CreateChamadoInput
) {
  const chamado = await fastify.prisma.chamado.create({
    data: {
      titulo: data.titulo,
      descricao: data.descricao,
      tipo: data.tipo,
      //status: data.status,
      dataConclusao: data.dataConclusao ? new Date(data.dataConclusao) : null,
      prioridade: data.prioridade,
      lojaId: data.lojaId,
      setorId: data.setorId,
      tokenId: data.tokenId,

      anexos: {
        create:
          data.anexos?.map((anexo) => ({
            arquivo: anexo.arquivo,
            lojaId: data.lojaId,
            setorId: data.setorId,
            tokenId: data.tokenId,
          })) || [],
      },
    },
    include: {
      loja: true,
      setor: true,
      anexos: true,
    },
  });

  await enviarChamadoParaFila(chamado);
  const routingKey = chamado.setor.nome.toUpperCase();
  io.to(routingKey).emit("novoChamado", chamado);
  console.log(`Evento 'novoChamado' emitido para o room ${routingKey}`);

  return chamado;
}

