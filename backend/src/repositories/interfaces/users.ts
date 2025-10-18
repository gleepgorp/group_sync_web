import type { UserEntity } from "types/users";

export interface UserRepository {
  create: (data: UserEntity) => Promise<string>;
  createWithId: (data: UserEntity) => Promise<void>;
  findAll: () => Promise<UserEntity[]>;
  findById: (id: string) => Promise<UserEntity | null>;
};
