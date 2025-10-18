import type { Auth } from "firebase-admin/lib/auth/auth";
import type { SessionService } from "services/interfaces/sessions";

export class SessionServiceImpl implements SessionService {
  #auth: Auth;

  constructor(auth: Auth) {
    this.#auth = auth;
  }

  async verifyToken (idToken: string) {
    return await this.#auth.verifyIdToken(idToken);
  }
};
