import { z } from "zod";


export const anexoSchema = z.object({
  arquivo: z.string(),
  lojaId: z.number(),
  setorId: z.number(),
  chamadoId: z.number()
});

export const createChamadoSchema = z.object({
  titulo: z.string().min(3),
  descricao: z.string().min(5),
  tipo: z.string(),
  //status: z.string(),
  prioridade: z.string(),
  dataCriacao: z.string().optional(),
  dataConclusao: z.string().nullable().optional(),
  lojaId: z.number(),
  setorId: z.number(),
  tokenId: z.number(),
  setor: z.string(),
  anexos: z.array(anexoSchema).optional(),
});

export type CreateChamadoInput = z.infer<typeof createChamadoSchema>;
