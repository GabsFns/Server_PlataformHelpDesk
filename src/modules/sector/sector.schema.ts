import z from "zod";

export const createRespostaSchema = z.object({
      mensagem: z.string().min(1, "Mensagem é obrigatória"),
      responsavel: z.number().int().positive("responsável deve ser um número positivo"),
      chamadoId: z.number().int().positive("ID do chamado deve ser um número positivo"),      
      lojaId: z.number().int().positive("ID da loja deve ser um número positivo").optional(),
      setorId: z.number().int().positive("ID do setor deve ser um número positivo").optional(),
      dataResposta: z.string().optional(),
})

export type CreateRespostaSchema = z.infer<typeof createRespostaSchema>;