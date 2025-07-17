import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { CreateRespostaSchema } from "./sector.schema";
import { enviarRespostaParaFila } from "@/services/rabbitmqService";
import { io } from "../../websocket/index";

export async function responseChamado(fastify: FastifyInstance, data: CreateRespostaSchema) {
    const resposta = await fastify.prisma.respostaChamado.create({
        data: {
            mensagem: data.mensagem,
            chamadoId: data.chamadoId,
            lojaId: data.lojaId,
            setorId: data.setorId,
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