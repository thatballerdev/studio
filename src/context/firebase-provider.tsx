"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { initializeFirebase } from '@/lib/firebase';

interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  db: null,
  loading: true,
});

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [firebase, setFirebase] = useState<Omit<FirebaseContextType, 'loading'>>({
    app: null,
    auth: null,
    db: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const instances = await initializeFirebase();
      setFirebase(instances);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <FirebaseContext.Provider value={{ ...firebase, loading }}>
      {children}
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
