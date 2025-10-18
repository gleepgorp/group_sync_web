import firebaseConfig from "../configs/firebase";
import admin, { type ServiceAccount } from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as ServiceAccount)
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
