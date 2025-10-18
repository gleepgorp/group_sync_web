import type { FastifyInstance } from "fastify";
import z from "zod";

export default async (fastify: FastifyInstance) => {
  const controller = fastify.userController;

  fastify.route({
    method: "GET",
    url: "",
    handler: controller.getUsers
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      params: z.object({ id: z.string() })
    },
    handler: controller.getUser
  });
};
