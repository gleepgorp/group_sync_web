import { z } from "zod";

export class GSError extends Error {
  timestamp: Date = new Date()
  status: number
  errorCode: string
  message: string

  constructor(data: GSErrorResponse) {
    super(data.message)
    this.status = data.status
    this.errorCode = data.errorCode
    this.message = data.message
  }
}

const ErrorResponseSchema = z.object({
  status: z.number(),
  errorCode: z.string(),
  message: z.string()
});

type GSErrorResponse = z.infer<typeof ErrorResponseSchema>
