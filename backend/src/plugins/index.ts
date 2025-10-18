import type { FastifyInstance } from "fastify";
import globalErrorHandler from "./global-error-handler";
import responseValidator from "./response-validator";
import layersPlugin from "./layers";

const serverPlugins = async (fastify: FastifyInstance) => {
  await fastify.register(globalErrorHandler);
  await fastify.register(responseValidator);
  await fastify.register(layersPlugin);
  fastify.decorateRequest("app", {
    getter() {
      return fastify;
    }
  });
};

export default serverPlugins;
