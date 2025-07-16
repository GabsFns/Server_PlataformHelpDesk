import { registerUser, authenticateUser, createToken } from "./auth.service";
import { FastifyInstance } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function registerController(req: any, rep: any) {
    try{
        const user = await registerUser(req.server, req.body);
        return rep.status(201).send(user); 
    } catch (error) {
        return rep.status(500).send({ error: "Internal Server Error" });

}}

export async function loginController(req: any, rep: any) {
    try{
        const result = await authenticateUser(req.server, req.body);
        return rep.status(200).send(result);
    } catch (error) {
        return rep.status(500).send({ error: "Internal Server Error" });
    }
 
}

export async function logoutController(req: any, rep: any) {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authGuard
        const result = await req.server.logoutUser(userId);
        return rep.status(200).send(result);
    } catch (error) {
        return rep.status(500).send({ error: "Internal Server Error" });
    }
}

export async function createTokenController(req: FastifyRequest, rep: FastifyReply) {
  console.log("Creating token...");
  try {
    const token = await createToken(req.server);
    return rep.status(201).send(token);
  } catch (error) {
    console.error('Erro ao criar token:', error);
    return rep.status(500).send({ error: "Erro interno ao criar token" });
  }
}