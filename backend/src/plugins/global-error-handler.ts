import { GSError, firebaseErrorToHttpStatus } from "errors/core";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { FirestoreErrorSchema } from "types/firestore";
import { ZodError } from "zod";

const globalErrorHandler = fp(async (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {

    const firestoreValdiation = FirestoreErrorSchema.safeParse(error);

    if (firestoreValdiation.success) {
      const code = firebaseErrorToHttpStatus(firestoreValdiation.data.code);
      return reply.code(code).send({
        errorCode: error.code.toLocaleUpperCase(),
        message: error.message,
        path: request.routeOptions.url
      });
    }

    if (error instanceof ZodError) {
      return reply.code(400).send({
        errorCode: "VALIDATION_ERROR",
        message: "The server cannot or will not process the request due to malformed syntax.",
        issues: error.issues,
        path: request.routeOptions.url
      });
    }

    if (error instanceof GSError) {
      return reply.code(error.status).send({
         ...error,
         path: request.routeOptions.url
      });
    }

    if (error instanceof Error) {
      if (error.statusCode) {
        return reply.code(error.statusCode).send({
          errorCode: error.code,
          message: error.message,
          path: request.routeOptions.url
        });
      }
    }

    return reply.code(500).send({
      error
    });
  });
}, { name: "global-error-handler" });

export default globalErrorHandler;
