// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { configFirebase } from "./ignoreConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: configFirebase.FIREBASE_API_KEY,

  authDomain: configFirebase.FIREBASE_AUTH_DOMAIN,

  projectId: configFirebase.FIREBASE_PROJECT_ID,

  storageBucket: configFirebase.FIREBASE_STORAGE_BUCCKET,

  messagingSenderId: configFirebase.FIREBASE_MESSAGEING_SENDER_ID,

  appId: configFirebase.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
