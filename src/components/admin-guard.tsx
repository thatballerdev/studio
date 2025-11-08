
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

const ADMIN_EMAIL = 'admin@northway.com';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until user state is resolved
    }

    if (!user) {
      router.push('/login'); // Not logged in, redirect to login
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      router.push('/dashboard'); // Not an admin, redirect to user dashboard
    }
  }, [user, isUserLoading, router]);

  // While loading or if user is not the admin, show a loader to prevent flashing content
  if (isUserLoading || user?.email !== ADMIN_EMAIL) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user is the admin, render the children
  return <>{children}</>;
}
