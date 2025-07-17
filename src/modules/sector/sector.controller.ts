import { FastifyRequest, FastifyReply} from "fastify";
import { createRespostaSchema } from "./sector.schema";
import { responseChamado } from "./sector.service";
import { ZodError } from "zod";
export async function responseChamadaController(req: FastifyRequest, rep: FastifyReply) {
    try {
        const parsed = createRespostaSchema.parse(req.body);
        const resposta = await responseChamado(req.server, parsed);
        return rep.status(201).send(resposta);
    } catch (error) {
        console.error("Erro ao registrar resposta:", error);

        if (error instanceof Error && "issues" in error) {
            return rep.status(400).send({ error: "Dados inválidos", details: error });
        }
        if (error instanceof ZodError) {
            return rep.status(400).send({ error: "Dados inválidos", details: error });
        }

        return rep.status(500).send({ error: "Erro interno ao registrar resposta" });
    }
}