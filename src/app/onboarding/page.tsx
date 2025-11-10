
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import AuthCheck from '@/components/auth-check';

// This page is now a redirector.
// Onboarding is handled by an external Tally form.
// Users created via signup are automatically marked as onboarded.
// If a user somehow lands here, we redirect them to the dashboard.
export default function OnboardingRedirectPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Once we confirm the user is loaded, redirect them.
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
    // If for some reason there's no user, AuthCheck will handle the redirect to login.
  }, [user, isUserLoading, router]);

  return (
    <AuthCheck>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </AuthCheck>
  );
}
