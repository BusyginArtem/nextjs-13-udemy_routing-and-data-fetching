import admin, { ServiceAccount } from "firebase-admin";

import serviceAccount from "../db/serviceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_URL,
  });
}

export const db = admin.database();
