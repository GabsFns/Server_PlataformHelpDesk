import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { CreateRespostaSchema, historicoChamadoSchema } from "./sector.schema";
import { enviarRespostaParaFila } from "@/services/rabbitmqService";
import { io } from "../../websocket/index";
import { stat } from "fs";
import { includes } from "zod";

export async function responseChamado(fastify: FastifyInstance, data: CreateRespostaSchema) {
   const resposta = await fastify.prisma.$transaction(async (tx: any) => {

     const chamado = await tx.chamado.findUnique({
        where: { id: data.chamadoId },
        include: {
            loja: true,
            setor: true,
        },
    });
    if (!chamado) {
        throw new Error("Chamado não encontrado");
    }

    const resposta = await tx.respostaChamado.create({
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

     await fastify.prisma.chamado.update({
        where: { id: chamado.id },
        data: {
            status: StatusChamado.EM_ATENDIMENTO,
            
        },
    });

    /*await tx.historicoChamado.create({
        data: {
            respostaChamadoId: resposta.idRespostaChamado,
            chamadoId: chamado.idChamado,
            lojaId: chamado.lojaId,
            setorId: chamado.setorId,
            tokenId: chamado.tokenId,
        },
    });
    */
   });
   
    await enviarRespostaParaFila(resposta);
    const routingKey = resposta.chamado.loja.nome.toUpperCase();
    io.to(routingKey).emit('novaResposta', resposta);

    return resposta;
}

// Pensar no fluxo se vai ser um JOB ou nao, levar criterio de perfomance e baos praticas
export async function InsirirNoHistorico(fastify: FastifyInstance, data: historicoChamadoSchema) {
    const chamado = await fastify.prisma.chamado.findUnique({
        where: { id: data.chamadoId },
        includes: {
            loja: true,
            setor: true,
        },
    });

    if (chamado.status == StatusChamado.CONCLUIDO) {
     const historico = await fastify.prisma.historicoChamado.create({
        data: {
            respostaChamadoId: data.respostaChamadoId,
            chamadoId: data.chamadoId,
            lojaId: data.lojaId,
            setorId: data.setorId,
        },
        includes: {
            chamado: true,
            loja: true,
            setor: true,
            responseChamado: true,
        },
    });
        return historico;
    }
}

export enum StatusChamado {
    ABERTO = "ABERTO",
    EM_ATENDIMENTO = "EM_ATENDIMENTO",
    AGUARDANDO_RETORNO = "AGUARDANDO_RETORNO",
    RESOLVIDO = "RESOLVIDO",
    CONCLUIDO = "CONCLUIDO",
    CANCELADO = "CANCELADO",
}