import { FastifyInstance } from "fastify";
import { hashPassword, comparePassword } from "../../utils/hash";
import { v4 as uuidv4 } from 'uuid';

export async function registerUser(fastify: FastifyInstance, dados: any) {
    const { email, senha, tipo, lojaId, setorId} = dados
    const hashedPassword = await hashPassword(senha);
    const user = await fastify.prisma.usuario.create({
        data: {
            email,
            senha: hashedPassword,
            tipo,
            lojaId: tipo === 'LOJA' ? lojaId : null,
            setorId: tipo === 'SETOR' ? setorId : null,
        },
    })
    return user;
};

export async function authenticateUser(fastify: FastifyInstance, dados: any) {
    const {email, senha} = dados;

    const user = await fastify.prisma.usuario.findUnique({where: { email },});
    if (!user) throw new Error('Usuário não encontrado');

    const isPasswordValid = await comparePassword(senha, user.senha);
    if (!isPasswordValid) throw new Error('Senha inválida');

    const token = fastify.jwt.sign({ 
        id: user.id, 
        email: user.email, 
        tipo: user.tipo,
        lojaId: user.lojaId,
        setorId: user.setorId
    });
    await fastify.redis.set(`token:${user.id}`, token, 'EX', 3600);

    return { token };
};

export async function logoutUser(fastify: FastifyInstance, userId: string) {
    await fastify.redis.del(`token:${userId}`);
    return { message: "Logout realizado com sucesso" };
}

export async function createToken(fastify: FastifyInstance) {
  const generatedToken = uuidv4();
  console.log(`Generated Token: ${generatedToken}`);

  try {
    const result = await fastify.prisma.token.create({
      data: {
        token: generatedToken,
      },
    });

    console.log('Retorno da criação do token:', result); // 💥 este log é fundamental

    console.log(`Token criado no banco: ${result.token}`);
    return result;

  } catch (error) {
    console.error('Erro ao criar token no banco:', error);
    throw error;
  }
}

