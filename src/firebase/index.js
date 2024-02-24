import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMMw1YuTMJ0iw2ACOpAc0x5cNkGfU-rVc",
  authDomain: "book-list-app-39045.firebaseapp.com",
  projectId: "book-list-app-39045",
  storageBucket: "book-list-app-39045.appspot.com",
  messagingSenderId: "600967023817",
  appId: "1:600967023817:web:1818959e6cbe5abdb6d118",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// console.log(app, import.meta.env, db);
