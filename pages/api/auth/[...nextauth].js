import NextAuth from "next-auth"
// import Providers from "next-auth/providers"
import GoogleProvider from 'next-auth/providers/google'
import { FirestoreAdapter } from "@auth/firebase-adapter"
import {cert} from 'firebase-admin/app'


import firebase from "firebase/app"
import "firebase/firestore"


export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.FIREBASE_ID,
      clientSecret: process.env.FIREBASE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  })
})