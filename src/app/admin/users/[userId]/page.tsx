
'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { ArrowLeft, Loader2, User } from 'lucide-react';
import { format } from 'date-fns';

import AdminGuard from '@/components/admin-guard';
import type { UserProfile } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | string[] | number | boolean | null;
}) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  let displayValue: React.ReactNode;

  if (Array.isArray(value)) {
    displayValue = (
      <div className="flex flex-wrap gap-2">
        {value.map(item => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    );
  } else if (typeof value === 'boolean') {
    displayValue = (
      <Badge variant={value ? 'default' : 'outline'}>
        {value ? 'Yes' : 'No'}
      </Badge>
    );
  } else {
    displayValue = <p className="text-foreground">{String(value)}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 py-3 border-b">
      <p className="font-semibold text-muted-foreground">{label}</p>
      <div className="md:col-span-2">{displayValue}</div>
    </div>
  );
};

export default function UserProfilePage() {
  const { firestore } = useFirebase();
  const params = useParams();
  const userId = params.userId as string;

  const userDocRef = useMemoFirebase(() => (firestore ? doc(firestore, 'users', userId) : null), [firestore, userId]);
  const { data: userProfile, isLoading, error } = useDoc<UserProfile>(userDocRef);

  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-destructive-foreground bg-destructive p-4 rounded-md">
            Error: {error.message}
          </div>
        )}

        {userProfile && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">
                    {userProfile.fullName || userProfile.name}
                  </CardTitle>
                  <CardDescription>{userProfile.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 border-t pt-4">
                User Preferences
              </h3>
              <div className="text-sm">
                <DetailItem label="Full Name" value={userProfile.fullName} />
                <DetailItem
                  label="Current Education"
                  value={userProfile.currentEducation}
                />
                <DetailItem
                  label="Target Degree"
                  value={userProfile.targetDegree}
                />
                <DetailItem
                  label="Field of Interest"
                  value={userProfile.fieldInterest}
                />
                <DetailItem
                  label="Annual Budget (USD)"
                  value={userProfile.budgetRangeUSD}
                />
                <DetailItem
                  label="English-Only Programs"
                  value={userProfile.englishOnly}
                />
                <DetailItem
                  label="Preferred Region"
                  value={userProfile.regionPreference}
                />
                <DetailItem
                  label="Desired Start Date"
                  value={userProfile.desiredStartDate}
                />
                <DetailItem label="Career Goal" value={userProfile.careerGoal} />
                <DetailItem
                  label="Scholarship Interest"
                  value={userProfile.scholarshipInterest}
                />
                <DetailItem
                  label="Preferred Study Mode"
                  value={userProfile.studyMode}
                />
                <DetailItem
                  label="Priority Factors"
                  value={userProfile.priorityFactors}
                />
                <DetailItem
                  label="Profile Last Updated"
                  value={
                    userProfile.profileUpdatedAt
                      ? format(
                          (userProfile.profileUpdatedAt as any).toDate(),
                          'PPpp'
                        )
                      : 'N/A'
                  }
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminGuard>
  );
}
