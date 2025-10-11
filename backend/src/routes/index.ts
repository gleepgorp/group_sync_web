import type { FastifyInstance } from "fastify";

const mainRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/",
    handler: (_request, reply) => reply.send("Server running...")
  });
};

export const apiRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(mainRoute);
};

export default apiRoutes;
