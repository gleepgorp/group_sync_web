import type { FastifyInstance } from "fastify";
import globalErrorHandler from "./global-error-handler";
import responseValidator from "./response-validator";

export const serverPlugins = async (fastify: FastifyInstance) => {
  await fastify.register(globalErrorHandler);
  await fastify.register(responseValidator);
};

export default serverPlugins;
