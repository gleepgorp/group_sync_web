import type { CollectionReference, Firestore, Query } from "firebase-admin/firestore";
import type { FirestoreRepository } from "repositories/interfaces/firestore";
import type { FirestoreOptions } from "types/firestore";

export class FirestoreRespositoryImpl<T> implements FirestoreRepository<T> {
  #firestore: Firestore;
  #options: FirestoreOptions<T>;

  constructor(firestore: Firestore, options: FirestoreOptions<T>) {
    this.#firestore = firestore;
    this.#options = options;
  }

  get #collection(): CollectionReference<Record<string, unknown>> {
    const {
      parentCollection,
      parentDocId,
      collectionName
     } = this.#options;

     if (parentCollection && parentDocId) {
      return this.#firestore
          .collection(parentCollection)
          .doc(parentDocId)
          .collection(collectionName);
     }

     return this.#firestore.collection(collectionName);
  }

  async findAll(): Promise<T[]> {
    const snapshot = await this.#collection.get();
    const items: T[] = [];

    snapshot.forEach((doc) => {
      items.push(this.#options.fromFirestore(doc.data(), doc.id));
    });

    return items;
  }

  async findById(id: string): Promise<T | null> {
    const docSnapshot = await this.#collection.doc(id).get();

    if (!docSnapshot.exists) {
      return null;
    }

    const data = docSnapshot.data();

    if (!data) {
      return null;
    }

    const item = this.#options.fromFirestore(data, docSnapshot.id);
    return item;
  }
  async create(data: T): Promise<string> {
    const docRef = await this.#collection.add(this.#options.toFirestore(data));
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.#collection.doc(id).update(this.#options.toFirestore(data as T));
  }

  async delete(id: string): Promise<void> {
    await this.#collection.doc(id).delete();
  }

  async query(queryBuilder: (collectionRef: CollectionReference) => Query): Promise<T[]> {
    const query = queryBuilder(this.#collection);
    const snapshot = await query.get();
    const items: T[] = [];

    snapshot.forEach((doc) => {
      items.push(this.#options.fromFirestore(doc.data(), doc.id));
    });

    return items;
  }
}
