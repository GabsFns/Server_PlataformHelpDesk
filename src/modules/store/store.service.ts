import { FastifyInstance } from "fastify";
import { enviarChamadoParaFila } from "@/services/rabbitmqService";
import { io } from "../../websocket/index";
import { CreateChamadoInput } from "./store.schema";
export async function createChamado(fastify: FastifyInstance, data: CreateChamadoInput) {
    const chamado = await fastify.prisma.chamado.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        tipo: data.tipo,
        status: data.status,
        prioridade: data.prioridade,
        dataCriacao: data.dataCriacao ? new Date(data.dataCriacao) : new Date(),
        dataConclusao: data.dataConclusao ? new Date(data.dataConclusao) : null,
        lojaId: data.lojaId,
        setorId: data.setorId,
        tokenId: data.tokenId,
      },
      include: {
        loja: true,
        setor: true,
      },
    });
    
    await enviarChamadoParaFila(chamado);
    const routingKey = chamado.setor.nome.toLowerCase();
    io.to(routingKey).emit('novoChamado', chamado);
    
     return chamado;
}

