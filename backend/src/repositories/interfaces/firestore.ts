import {
  type CollectionReference,
  type Query
} from "firebase-admin/firestore";

export interface FirestoreRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: T): Promise<string>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  query(queryBuilder: (collectionRef: CollectionReference) => Query): Promise<T[]>
};
