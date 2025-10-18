import type { Firestore } from "firebase-admin/firestore";
import { UserRepositoryImpl } from "repositories/implementations/users";
import type { UserRepository } from "repositories/interfaces/users";
import type { UserService } from "services/interfaces/users";
import type { UserRequest, UserResponse } from "types/users";

export class UserServiceImpl implements UserService {
  #repository: UserRepository;

  constructor(db: Firestore) {
    this.#repository = new UserRepositoryImpl(db);
  }

  async create (data: UserRequest): Promise<string> {
    const entity = data.toEntity();
    const id = await this.#repository.create(entity);
    return id;
  }

  async createWithId (data: UserRequest, id: string): Promise<void> {
    const entity = data.toEntityWithId(id);
    await this.#repository.create(entity);
  }

  async findAll (): Promise<UserResponse[]> {
    const users = await this.#repository.findAll();

    return users.map(user => user.toResponse());
  }

  async findById (id: string): Promise<UserResponse | null> {
    const user = await this.#repository.findById(id);
    return user?.toResponse() ?? null;
  }
};
