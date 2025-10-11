import type { FastifyInstance } from "fastify";

import jwtVerify from "./jwt-verify";

export const serverHooks = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", jwtVerify);
};

export default serverHooks;
