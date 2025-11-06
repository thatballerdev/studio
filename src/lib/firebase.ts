import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-7345835072-fa19b",
  appId: "1:137171377701:web:b28aa4b1b92cef85fba9cc",
  apiKey: "AIzaSyCBGJUC8au0t659e_dNQyGfTrBaqMX_OMQ",
  authDomain: "studio-7345835072-fa19b.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "137171377701",
};

interface FirebaseInstances {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
}

let firebaseInstances: FirebaseInstances | null = null;

export const initializeFirebase = async (): Promise<FirebaseInstances> => {
    if (firebaseInstances) {
        return firebaseInstances;
    }

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    if (typeof window !== 'undefined') {
        try {
            await enableIndexedDbPersistence(db);
        } catch (err: any) {
            if (err.code == 'failed-precondition') {
                console.warn('Firestore persistence failed: multiple tabs open.');
            } else if (err.code == 'unimplemented') {
                console.warn('Firestore persistence not available in this browser.');
            }
        }
    }
    
    firebaseInstances = { app, auth, db };
    return firebaseInstances;
};
