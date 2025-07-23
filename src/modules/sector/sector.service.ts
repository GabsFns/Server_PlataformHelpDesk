import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { CreateRespostaSchema } from "./sector.schema";
import { enviarRespostaParaFila } from "@/services/rabbitmqService";
import { io } from "../../websocket/index";

export async function responseChamado(fastify: FastifyInstance, data: CreateRespostaSchema) {
    const chamado = await fastify.prisma.chamado.findUnique({
        where: { id: data.chamadoId },
        include: {
            loja: true,
            setor: true,
        },
    });
    
    if (!chamado) {
        throw new Error("Chamado não encontrado");
    }

    const resposta = await fastify.prisma.respostaChamado.create({
        data: {
            mensagem: data.mensagem,
            chamadoId: chamado.chamadoId,
            lojaId: chamado.lojaId,
            setorId: chamado.setorId,
            responsavel: data.responsavel,
            dataResposta: data.dataResposta ? new Date(data.dataResposta) : new Date(),
        },
        include: {
            chamado: {
                include: {
                    loja: true,
                    setor: true,
                },
            },
        },
    });

    await enviarRespostaParaFila(resposta);
    const routingKey = resposta.chamado.loja.nome.toUpperCase();
    io.to(routingKey).emit('novaResposta', resposta);

    

    return resposta;
}