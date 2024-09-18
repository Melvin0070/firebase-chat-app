import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration, using environment variables for sensitive info
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-shneki-2222.firebaseapp.com",
  projectId: "chatapp-shneki-2222",
  storageBucket: "chatapp-shneki-2222.appspot.com",
  messagingSenderId: "155028327826",
  appId: "1:155028327826:web:14406bb0a485316f7c854b",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services using the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
