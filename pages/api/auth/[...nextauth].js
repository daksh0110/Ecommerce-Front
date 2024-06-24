import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";

import { cert } from "firebase-admin/app";

import "firebase/firestore";

export const authOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
