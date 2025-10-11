import type { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";

import corsConfig from "./cors";
import jwtConfig from "./jwt";
import rateLimitConfig from "./rate-limit";

export const serverConfigs = async (fastify: FastifyInstance) => {
  fastify.server.keepAliveTimeout = 61 * 1000;
  fastify.server.headersTimeout = 65 * 1000;

  await fastify.register(cors, corsConfig);
  await fastify.register(helmet);
  await fastify.register(jwt, jwtConfig);
  await fastify.register(rateLimit, rateLimitConfig);
};

export default serverConfigs;
