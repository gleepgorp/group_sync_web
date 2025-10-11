import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { ZodType } from "zod";

export const requestValidator = fp(async (fastify: FastifyInstance) => {
  fastify.setValidatorCompiler(({ schema }) => (data) => {
      const parsedRequest = (schema as ZodType).safeParse(data)

      if (parsedRequest.success) {
        return { value: parsedRequest.data }
      }

      const error = parsedRequest.error

      return { error }
    }
  )
}, { name: "request-validator" });

export default requestValidator;