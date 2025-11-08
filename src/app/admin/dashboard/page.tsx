
'use client';

import { useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import AdminGuard from '@/components/admin-guard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users } from 'lucide-react';
import type { UserProfile } from '@/lib/types';

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const router = useRouter();

  const usersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'users')) : null),
    [firestore]
  );

  const { data: users, isLoading, error } = useCollection<UserProfile>(usersQuery);

  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Users className="mr-3 h-8 w-8" />
          Admin Dashboard
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users ({users?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
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
            {!isLoading && users && (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Onboarding Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={`${user.uid}-${index}`}
                        onClick={() => router.push(`/admin/users/${user.uid}`)}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{user.fullName || user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.onboardingComplete
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {user.onboardingComplete
                              ? 'Complete'
                              : 'Incomplete'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
}
