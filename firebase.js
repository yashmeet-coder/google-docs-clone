import { getApp,getApps,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC7nlYbBttpBIW665kRRFa6i2xxeYzzSSo",
  authDomain: "docs-b8fb1.firebaseapp.com",
  projectId: "docs-b8fb1",
  storageBucket: "docs-b8fb1.appspot.com",
  messagingSenderId: "200599414638",
  appId: "1:200599414638:web:da7b312f3abc1a6320437f"
};
  
const app = getApps.length? getApp(): initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

