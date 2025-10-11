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
