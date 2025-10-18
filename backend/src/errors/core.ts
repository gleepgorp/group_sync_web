export class GSError extends Error {
  timestamp: Date = new Date();
  status: number;
  errorCode: string;
  message: string;

  constructor(data: GSErrorResponse) {
    super(data.message);
    this.status = data.status;
    this.errorCode = data.errorCode;
    this.message = data.message;
  }
}

type GSErrorResponse = {
  status: number,
  errorCode: string,
  message: string
}

export const firebaseErrorToHttpStatus = (code: string) => {
  switch (code) {
    case "permission-denied":
      return 403;
    case "not-found":
      return 404;
    case "already-exists":
      return 409;
    case "invalid-argument":
      return 400;
    case "unauthenticated":
      return 401;
    case "authentication-error":
      return 401;
    case "resource-exhausted":
      return 429;
    case "internal":
      return 500;
    case "unavailable":
      return 503;
    case "deadline-exceeded":
      return 504;
    case "cancelled":
      return 499;
    case "unknown":
      return 500;
    default:
      return 500;
  }
};
