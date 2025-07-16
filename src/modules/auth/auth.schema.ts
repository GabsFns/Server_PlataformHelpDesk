export const cadastroSchema = {
  body: {
    type: 'object',
    required: ['email', 'senha', 'tipo'],
    properties: {
      email: { type: 'string', format: 'email' }, 
      senha: { type: 'string', minLength: 6 },
      tipo: { type: 'string', enum: ['ADMIN', 'LOJA', 'SETOR'] },
      lojaId: { type: 'integer', nullable: true },
      setorId: { type: 'integer', nullable: true },
    },
},
}

export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'senha'],
    properties: {
      email: { type: 'string', format: 'email' },
      senha: { type: 'string', minLength: 6 },
    },
  },
};

