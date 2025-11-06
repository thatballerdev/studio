import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-7345835072-fa19b",
  appId: "1:137171377701:web:b28aa4b1b92cef85fba9cc",
  apiKey: "AIzaSyCBGJUC8au0t659e_dNQyGfTrBaqMX_OMQ",
  authDomain: "studio-7345835072-fa19b.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "137171377701",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a time.
        console.warn('Firestore persistence failed: multiple tabs open.');
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence.
        console.warn('Firestore persistence not available in this browser.');
      }
    });
}


export { app, auth, db };
