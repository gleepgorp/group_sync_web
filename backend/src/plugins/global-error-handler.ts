import { GSError } from "errors/core";
import fastify, { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { ZodError } from "zod";

export const globalErrorHandler = fp(async (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.code(400).send({
        errorCode: "VALIDATION_ERROR",
        message: "The server cannot or will not process the request due to malformed syntax.",
        issues: error.issues,
        path: request.routeOptions.url
      });
    }

    if (error instanceof GSError) {
      reply.code(error.status).send({
         ...error,
         path: request.routeOptions.url
      })
    }

    if (error instanceof Error) {
      if (error.statusCode) {
        reply.code(error.statusCode).send({
          errorCode: error.code,
          message: error.message,
          path: request.routeOptions.url
        })
      }
    }

    reply.code(500).send({
      error
    })
  })
}, { name: "global-error-handler" });

export default globalErrorHandler;