import { FastifyInstance } from "fastify";
import { authRoutes } from "../modules/auth/auth.routes";
import { storeRoutes } from "@/modules/store/store.routes";
import { sectorRoutes } from "@/modules/sector/sector.routes";
export default async function appRoutes(app: FastifyInstance) {
    app.register(authRoutes, { prefix: '/api/v1/auth' });
    app.register(storeRoutes);
    app.register(sectorRoutes);
}