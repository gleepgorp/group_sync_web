import type { UserRequest, UserResponse } from "types/users";

export interface UserService {
  create: (data: UserRequest) => Promise<string>;
  createWithId: (data: UserRequest, id: string) => Promise<void>;
  findAll: () => Promise<UserResponse[]>;
  findById: (id: string) => Promise<UserResponse | null>;
};
