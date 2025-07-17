import { FastifyRequest, FastifyReply } from "fastify";
import { createChamado } from "./store.service";
import { createChamadoSchema } from "./store.schema";
import { ZodError } from "zod";
export async function registerChamado(req: FastifyRequest, rep: FastifyReply) {
  try {
    const parsed = createChamadoSchema.parse(req.body);
    const chamado = await createChamado(req.server, parsed);
    return rep.status(201).send(chamado);
  } catch (error) {
    console.error("Erro ao registrar chamado:", error);
    
    if (error instanceof Error && "issues" in error) {
      return rep.status(400).send({ error: "Dados inválidos", details: error });
    }
    if (error instanceof ZodError) {
      return rep.status(400).send({ error: "Dados inválidos", details: error });
    }

    return rep.status(500).send({ error: "Erro interno ao registrar chamado" });
  }
}