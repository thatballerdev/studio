"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { initializeFirebase } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (loading) {
     return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="w-1/2 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-8 w-1/4" />
        </div>
      </div>
    )
  }

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
