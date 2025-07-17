const swaggerOptions = {
  swagger: {
    info: {
      title: 'API HelpDesk - Gestão de Chamados',
      description: 'Documentação da API para autenticação, abertura de chamados e encaminhamentos.',
      version: '1.0.0',
    },
    tags: [
      { name: 'Auth', description: 'Operações de autenticação de usuários' },
      { name: 'Setores', description: 'Encaminhamento de chamados para setores' },
      { name: 'Chamados', description: 'Abertura e registro de chamados por lojas' },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};

export default swaggerOptions;