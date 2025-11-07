
"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type Auth, type User } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, enableIndexedDbPersistence, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import type { UserProfile } from '@/lib/types';
import { Loader2 } from 'lucide-react';

// IMPORTANT: Replace with your actual Firebase configuration
const firebaseConfig = {
  projectId: "studio-7345835072-fa19b",
  appId: "1:137171377701:web:b28aa4b1b92cef85fba9cc",
  apiKey: "AIzaSyCBGJUC8au0t659e_dNQyGfTrBaqMX_OMQ",
  authDomain: "studio-7345835072-fa19b.firebaseapp.com",
  storageBucket: "studio-7345835072-fa19b.appspot.com",
};

interface FirebaseContextType {
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

// We assert the context type because we are ensuring it's provided in the provider.
const FirebaseContext = createContext<FirebaseContextType>(null!);

let firebaseApp: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
  enableIndexedDbPersistence(db).catch((err: any) => {
    if (err.code == 'failed-precondition') {
      console.warn('Firestore persistence failed: multiple tabs open.');
    } else if (err.code == 'unimplemented') {
      console.warn('Firestore persistence not available in this browser.');
    }
  });
} else {
  firebaseApp = getApp();
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
}


export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      // No user, so no profile to fetch.
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, 
      (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        } else {
          // This case might happen briefly during user creation
          setUserProfile(null);
        }
        setLoading(false); // Profile fetched or confirmed not to exist
      },
      (error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    );

    return () => unsubscribeProfile();
  }, [user]);

  if (loading) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <FirebaseContext.Provider value={{ auth, db, storage, user, userProfile, loading }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
