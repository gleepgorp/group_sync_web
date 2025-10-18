import z from "zod";

export interface FirestoreOptions<T> {
  collectionName: string;
  parentCollection?: string;
  parentDocId?: string;
  fromFirestore: (data: Record<string, unknown>, id: string) => T;
  toFirestore: (data: T) => Record<string, unknown>;
};

export const FirestoreErrorSchema = z.object({
  code: z.string(),
  message: z.string()
});
