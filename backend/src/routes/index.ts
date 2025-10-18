import type { FastifyInstance } from "fastify";
import users from "./users";
import sessions from "./sessions";

const mainRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/",
    handler: (_request, reply) => reply.send("Server running...")
  });
};

const apiRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(mainRoute);
  await fastify.register(users, { prefix: "/api/v1/users" });
  await fastify.register(sessions, { prefix: "/api/v1/sessions" });
};

export default apiRoutes;
