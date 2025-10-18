import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserService } from "services/interfaces/users";

export class UserController {
  #userService: UserService;

  constructor(service: UserService) {
    this.#userService = service;
    this.getUsers = this.getUsers.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async getUsers (
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    const users = await this.#userService.findAll();

    return reply.code(200).send(users);
  }

  async getUser (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const user = await this.#userService.findById(id);

    return reply.code(200).send(user);
  }
};
