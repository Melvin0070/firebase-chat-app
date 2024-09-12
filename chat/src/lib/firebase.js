import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-shneki-2222.firebaseapp.com",
  projectId: "chatapp-shneki-2222",
  storageBucket: "chatapp-shneki-2222.appspot.com",
  messagingSenderId: "155028327826",
  appId: "1:155028327826:web:14406bb0a485316f7c854b",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage();