import { RouteDoesNotExist } from "errors/business";
import { FastifyRequest, FastifyReply } from "fastify";
import { PUBLIC_ROUTES } from "utils/constants";

export const jwtVerify = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
    if (!request.routeOptions.url) {
      throw new RouteDoesNotExist();
    }

    const isPublic = PUBLIC_ROUTES.includes(request.routeOptions.url);
    const isRegistration = 
      request.routeOptions.url === "/api/v1/users" &&
      request.method === "POST";

    if (isPublic || isRegistration) return;

    await request.jwtVerify();
}

export default jwtVerify;