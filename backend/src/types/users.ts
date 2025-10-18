
import { Timestamp } from "firebase-admin/firestore";
import z from "zod";

export const UserRequestSchema = z.object({
  email: z.email(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

export const UserEntitySchema = z.object({
  email: z.email(),
  username: z.string(),
  fullName: z.string(),
  createdAt: z.instanceof(Timestamp)
    .transform(timestamp => new Date(timestamp.toMillis()).toDateString()),
  updatedAt: z.instanceof(Timestamp)
    .transform(timestamp => new Date(timestamp.toMillis()).toDateString())
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  fullName: z.string(),
  createdAt: z.string()
});

export class UserEntity {
  id?: string;
  email: string;
  username: string;
  fullName: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(details: {
    id?: string,
    email: string,
    username: string,
    fullName: string,
    createdAt?: string,
    updatedAt?: string
  }) {
    this.id = details.id;
    this.email = details.email;
    this.username = details.username;
    this.fullName = details.fullName;
    this.createdAt = details.createdAt;
    this.updatedAt = details.updatedAt;
  }

  toResponse (): UserResponse {
    return new UserResponse({
      id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
      createdAt: this.createdAt
    });
  }

  static fromFirestore (data: Record<string, unknown>, id: string): UserEntity {
    const validatedData = UserEntitySchema.parse(data);
    return new UserEntity({
      ...validatedData,
      id
    });
  }

  static toFirestore (data: UserEntity): Record<string, unknown> {
    return {
      email: data.email,
      username: data.username,
      fullName: data.fullName,
      createdAt: data.createdAt ?? Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date())
    };
  }
};

export class UserRequest {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;

  constructor(request: {
    email: string,
    username?: string,
    firstName?: string,
    lastName?: string
  }) {
    this.email = request.email;
    this.username = request.username;
    this.firstName = request.firstName;
    this.lastName = request.lastName;
  }

  static create (data: unknown): UserRequest {
    const validatedData = UserRequestSchema.parse(data);
    return new UserRequest(validatedData);
  }

  toEntity (): UserEntity {
    return new UserEntity({
      email: this.email,
      username: this.username ?? "",
      fullName: `${this.firstName} ${this.lastName}`
    });
  }

  toEntityWithId (id: string): UserEntity {
    return new UserEntity({
      ...this.toEntity(),
      id
    });
  }
};

export class UserResponse {
  id?: string;
  email: string;
  username: string;
  fullName: string;
  createdAt?: string;

  constructor(entity: {
    id?: string,
    email: string,
    username: string,
    fullName: string,
    createdAt?: string
  }) {
    this.id = entity.id;
    this.email = entity.email;
    this.username = entity.username;
    this.fullName = entity.fullName;
    this.createdAt = entity.createdAt;
  }
}
