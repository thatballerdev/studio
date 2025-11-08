
'use client';

import { useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { ArrowLeft, Loader2, User, Download } from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const firestore = useFirestore();
  const params = useParams();
  const userId = params.userId as string;
  const profileRef = useRef<HTMLDivElement>(null);

  const userDocRef = useMemoFirebase(() => (firestore ? doc(firestore, 'users', userId) : null), [firestore, userId]);
  const { data: userProfile, isLoading, error } = useDoc<UserProfile>(userDocRef);

  const handleDownloadPdf = () => {
    const input = profileRef.current;
    if (!input) {
        console.error("Profile element not found for PDF generation.");
        return;
    }

    html2canvas(input, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: window.getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)' ? '#FFFFFF' : '#1C2532'
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        const ratio = canvasWidth / canvasHeight;
        let newCanvasWidth = pdfWidth - 40; // Add some margin
        let newCanvasHeight = newCanvasWidth / ratio;

        if (newCanvasHeight > pdfHeight - 40) {
            newCanvasHeight = pdfHeight - 40;
            newCanvasWidth = newCanvasHeight * ratio;
        }

        const x = (pdfWidth - newCanvasWidth) / 2;
        const y = 20;

        pdf.addImage(imgData, 'PNG', x, y, newCanvasWidth, newCanvasHeight);
        pdf.save(`northway-profile-${userId}.pdf`);
    });
};

  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" onClick={handleDownloadPdf}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
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
             <Card ref={profileRef} className="p-4 sm:p-6">
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
                    <DetailItem label="Email" value={userProfile.email} />
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
