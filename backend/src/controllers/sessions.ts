import type { FastifyReply, FastifyRequest } from "fastify";
import type { SessionService } from "services/interfaces/sessions";
import type { UserService } from "services/interfaces/users";
import { UserRequest } from "types/users";

export class SessionController {
  #sessionService: SessionService;
  #userService: UserService;

  constructor(service: {
    session: SessionService,
    user: UserService
  }) {
    this.#sessionService = service.session;
    this.#userService = service.user;
  }

  async createSession (
    request: FastifyRequest<{
      Body: { idToken: string }
    }>,
    reply: FastifyReply
  ) {
    const { idToken } = request.body;
    const decodedToken = await this.#sessionService.verifyToken(idToken);
    const { uid, email } = decodedToken;

    const user = await this.#userService.findById(uid);

    if (!user) {
      const userRequest = UserRequest.create({ email });
      await this.#userService.createWithId(userRequest, uid);
    }

    const jwtToken = request.app.jwt.sign({ id: uid, email });

    return reply.code(201).send(jwtToken);
  }
};
