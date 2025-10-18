import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface SessionService {
  verifyToken: (idToken: string) => Promise<DecodedIdToken>
};
