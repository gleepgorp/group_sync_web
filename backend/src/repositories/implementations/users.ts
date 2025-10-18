import type { UserRepository } from "repositories/interfaces/users";
import { FirestoreRespositoryImpl } from "./firestore";
import { UserEntity } from "types/users";
import type { Firestore } from "firebase-admin/firestore";
import type { FirestoreRepository } from "repositories/interfaces/firestore";

export class UserRepositoryImpl implements UserRepository {
  #firestore: FirestoreRepository<UserEntity>;

  constructor(db: Firestore) {
    this.#firestore = new FirestoreRespositoryImpl<UserEntity>(db, {
      collectionName: "users",
      toFirestore: UserEntity.toFirestore,
      fromFirestore: UserEntity.fromFirestore
    });
  }

  async create (data: UserEntity): Promise<string> {
    const id = await this.#firestore.create(data);
    return id;
  }

  async createWithId (data: UserEntity): Promise<void> {
    await this.#firestore.create(data);
  }

  async findAll (): Promise<UserEntity[]> {
    const users = await this.#firestore.findAll();
    return users;
  }

  async findById (id: string): Promise<UserEntity | null> {
    const user = await this.#firestore.findById(id);
    return user;
  }
};
