import { FastifyInstance } from "fastify";
import { authRoutes } from "../modules/auth/auth.routes";

export default async function appRoutes(app: FastifyInstance) {
    app.register(authRoutes);
}