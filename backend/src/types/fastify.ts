import type { SessionController } from "controllers/sessions";
import type { UserController } from "controllers/users";

declare module "fastify" {
  interface FastifyInstance {
    userController: UserController;
    sessionController: SessionController;
  }

  interface FastifyRequest {
    app: FastifyInstance;
  }
};
