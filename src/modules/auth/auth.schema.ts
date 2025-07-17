export const cadastroSchema = {
  tags: ['Auth'],
  summary: 'Cadastro de novo usuário',
  description: 'Cria um novo usuário no sistema. O tipo pode ser ADMIN, LOJA ou SETOR. Para tipos LOJA ou SETOR, informe o respectivo ID.',
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
  response: {
    201: {
      description: 'Usuário cadastrado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        tipo: { type: 'string' },
      },
    },
    400: {
      description: 'Erro de validação ou dados inválidos',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export const loginSchema = {
  tags: ['Auth'],
  summary: 'Login de usuário',
  description: 'Autentica o usuário com e-mail e senha. Retorna o token de acesso JWT.',
  body: {
    type: 'object',
    required: ['email', 'senha'],
    properties: {
      email: { type: 'string', format: 'email' },
      senha: { type: 'string', minLength: 6 },
    },
  },
  response: {
    200: {
      description: 'Login bem-sucedido',
      type: 'object',
      properties: {
        token: { type: 'string' },
        usuario: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            tipo: { type: 'string' },
          },
        },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export const logoutSchema = {
  tags: ['Auth'],
  summary: 'Logout do usuário',
  description: 'Realiza o logout do usuário autenticado, invalidando o token armazenado no Redis.',
  security: [{ bearerAuth: [] }], // Para exibir que precisa de autenticação JWT (opcional se você configurar o Swagger com isso)
  response: {
    200: {
      description: 'Logout realizado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Logout realizado com sucesso' },
      },
    },
    401: {
      description: 'Token inválido ou não autorizado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};


