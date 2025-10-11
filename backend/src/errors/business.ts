import { GSError } from "./core";

export class RouteDoesNotExist extends GSError {
  constructor() {
    super({
      status: 404,
      errorCode: "ROUTE_DOES_NOT_EXIST",
      message: "Route not found."
    });
  }
};
