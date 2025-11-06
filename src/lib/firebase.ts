import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-7345835072-fa19b",
  appId: "1:137171377701:web:b28aa4b1b92cef85fba9cc",
  apiKey: "AIzaSyCBGJUC8au0t659e_dNQyGfTrBaqMX_OMQ",
  authDomain: "studio-7345835072-fa19b.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "137171377701",
  storageBucket: "studio-7345835072-fa19b.appspot.com",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
