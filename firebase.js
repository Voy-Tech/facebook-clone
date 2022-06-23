// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzjH-mu6zLjfLOef3kVvOd7bXnwxYYHmY",
  authDomain: "facebook-clone-b3019.firebaseapp.com",
  projectId: "facebook-clone-b3019",
  storageBucket: "facebook-clone-b3019.appspot.com",
  messagingSenderId: "85873783856",
  appId: "1:85873783856:web:4609375f1f5169690b69f5",
  measurementId: "G-RPWP6HZ5W7"
};

// Initialize Firebase (Singleton Pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

// Explicit export
export { app, db, storage }