import type { FastifyInstance } from "fastify";
import z from "zod";

export default async (fastify: FastifyInstance) => {
  const controller = fastify.sessionController;

  fastify.route({
    method: "POST",
    url: "",
    schema: {
      body: z.object({ idToken: z.string() })
    },
    handler: controller.createSession
  });
};
