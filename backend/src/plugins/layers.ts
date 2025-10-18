import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { UserServiceImpl } from "services/implementations/users";
import { db, auth } from "../utils/firestore";
import { UserController } from "controllers/users";
import { SessionController } from "controllers/sessions";
import { SessionServiceImpl } from "services/implementations/sessions";

const layersPlugin = fp(async (fastify: FastifyInstance) => {
  const userService = new UserServiceImpl(db);
  const userController = new UserController(userService);

  const sessionService = new SessionServiceImpl(auth);
  const sessionController = new SessionController({
    session: sessionService,
    user: userService
  });

  fastify.decorate("userController", userController);
  fastify.decorate("sessionController", sessionController);
});

export default layersPlugin;
