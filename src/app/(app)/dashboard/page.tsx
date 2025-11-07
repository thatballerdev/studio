
"use client";

import { useFirebase } from '@/context/firebase-provider';
import { universityData } from '@/lib/university-data';
import UniversityCard from '@/components/university-card';
import { Button } from '@/components/ui/button';
import { Loader2, Telescope } from 'lucide-react';
import Link from 'next/link';

function budgetToNumber(budgetRange?: string): number {
    if (!budgetRange) return 100000;
    if (budgetRange.includes('+')) return 100000;
    const numbers = budgetRange.split('-').map(s => parseInt(s, 10));
    return numbers[1] || 100000;
}

export default function DashboardPage() {
  const { userProfile, loading } = useFirebase();

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!userProfile?.onboardingComplete) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm bg-card animate-in fade-in duration-500">
        <div className="flex flex-col items-center gap-2 text-center p-8">
            <Telescope className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">Complete your profile</h3>
            <p className="text-sm text-muted-foreground mb-4">Tell us your preferences to discover universities.</p>
            <Button asChild><Link href="/onboarding">Start Onboarding</Link></Button>
        </div>
      </div>
    )
  }

  const filteredUniversities = universityData.filter(uni => {
    // New budget logic
    const userBudgetMax = budgetToNumber(userProfile.budgetRangeUSD);
    const budgetMatch = userProfile.budgetRangeUSD ? uni.annualCost <= userBudgetMax : true;
    
    // Legacy country logic
    const countryMatch = userProfile.preferredCountries ? userProfile.preferredCountries.some(c => uni.countryCode === c) : true;

    // TODO: Add more filtering based on new preferences like region, etc.
    return budgetMatch && countryMatch;
  });

  return (
    <div className="container mx-auto">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold">Your University Feed</h1>
        <p className="text-muted-foreground">Based on your preferences, here are some recommendations.</p>
      </div>

      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni, index) => (
            <div key={uni.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <UniversityCard university={uni} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm bg-card py-24 animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-2 text-center p-8">
                <h3 className="text-2xl font-bold tracking-tight">No Matches Found</h3>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your preferences to see more universities.</p>
                <Button asChild><Link href="/profile">Edit Preferences</Link></Button>
            </div>
        </div>
      )}
    </div>
  );
}

    