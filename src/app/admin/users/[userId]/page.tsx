
'use client';

import { useRef } from 'react';
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
          <Badge key={item} variant="secondary" className="font-normal">
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

    const originalBg = input.style.backgroundColor;
    input.style.backgroundColor = 'white';


    html2canvas(input, {
        scale: 2, 
        useCORS: true,
        onclone: (document) => {
            // Ensure text is dark for the PDF
            document.querySelectorAll('p, div, h3, span, h4, h2, h1, [class*="text-"]').forEach((el) => {
                (el as HTMLElement).style.color = 'black';
            });
             document.querySelectorAll('.text-muted-foreground').forEach((el) => {
                (el as HTMLElement).style.color = '#6b7280';
            });
             document.querySelectorAll('[class*="font-semibold"], [class*="font-bold"]').forEach((el) => {
                (el as HTMLElement).style.fontWeight = '600';
            });
             document.querySelectorAll('div[role="badge"]').forEach((el) => {
                (el as HTMLElement).style.backgroundColor = '#f3f4f6'; // secondary bg
                (el as HTMLElement).style.color = '#111827'; // secondary-foreground
                (el as HTMLElement).style.border = '1px solid #e5e7eb';
            });
        }
    }).then((canvas) => {
        input.style.backgroundColor = originalBg;

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        
        const imgProps= pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }
        
        pdf.save(`northway-profile-${userProfile?.fullName || userId}.pdf`);
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
          {userProfile && (
             <Button onClick={handleDownloadPdf}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
          )}
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
             <Card ref={profileRef} className="p-4 sm:p-6 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <User className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {userProfile.fullName || userProfile.name}
                      </CardTitle>
                      <CardDescription>{userProfile.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mt-6 mb-4 border-t pt-6">
                    Contact Information
                  </h3>
                   <div className="text-sm space-y-2">
                    <DetailItem label="Full Name" value={userProfile.fullName} />
                    <DetailItem label="Email" value={userProfile.email} />
                    <DetailItem label="Phone Number" value={userProfile.phoneNumber} />
                    <DetailItem label="Preferred Contact" value={userProfile.contactMethod} />
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4 border-t pt-6">
                    Study Preferences
                  </h3>
                  <div className="text-sm space-y-2">
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
                      label="Priorities"
                      value={userProfile.priorityFactors}
                    />
                    <DetailItem
                      label="Onboarding Complete"
                      value={userProfile.onboardingComplete}
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
