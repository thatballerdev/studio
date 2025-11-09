
'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { ArrowLeft, Loader2, User, Download, Mail, Phone, BookOpen, Briefcase, DollarSign, Globe, Calendar, Award, Monitor, Star } from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

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
import Logo from '@/components/logo';

const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | string[] | number | boolean | null;
  icon?: React.ReactNode;
}) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  let displayValue: React.ReactNode;

  if (Array.isArray(value)) {
    displayValue = (
      <div className="flex flex-wrap gap-2">
        {value.map(item => (
          <Badge key={item} variant="secondary" className="font-normal text-sm">
            {item}
          </Badge>
        ))}
      </div>
    );
  } else if (typeof value === 'boolean') {
    displayValue = (
      <Badge variant={value ? 'default' : 'outline'} className="font-semibold text-sm">
        {value ? 'Yes' : 'No'}
      </Badge>
    );
  } else {
    displayValue = <p className="text-foreground text-sm">{String(value)}</p>;
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 border-b"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-semibold text-muted-foreground flex items-center gap-2 text-sm">{icon}{label}</p>
      <div className="md:col-span-2">{displayValue}</div>
    </motion.div>
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

    // Temporarily set background to white for PDF generation
    const originalBg = input.style.backgroundColor;
    input.style.backgroundColor = 'white';

    html2canvas(input, {
        scale: 2, 
        useCORS: true, // Important for external images like the logo
        onclone: (document) => {
            // Make the logo visible for the PDF clone
            const logo = document.getElementById('pdf-logo-header');
            if (logo) {
              logo.classList.remove('hidden');
            }
        }
    }).then((canvas) => {
        // Restore original background color after capture
        input.style.backgroundColor = originalBg;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        pdf.save(`NorthWay_Profile_${userProfile?.fullName?.replace(' ', '_') || userId}.pdf`);
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
           {userProfile && !isLoading && (
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

        {userProfile && !isLoading && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
             >
              <Card ref={profileRef} className="bg-card p-4 sm:p-8 rounded-2xl shadow-md">
                <div id="pdf-logo-header" className="hidden text-center mb-8">
                    <div className="flex justify-center mb-2"><Logo width={120} height={40}/></div>
                    <p className="text-sm italic text-gray-500">Education with purpose, not pressure.</p>
                </div>

                <CardHeader className="text-center border-b pb-6">
                    <User className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle className="text-3xl font-bold">
                    {userProfile.fullName || userProfile.name}
                    </CardTitle>
                    <CardDescription className="text-md">{userProfile.email}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mt-4 mb-4 flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                    Contact Information
                  </h3>
                   <div className="text-sm space-y-2">
                    <DetailItem label="Full Name" value={userProfile.fullName} />
                    <DetailItem label="Email" value={userProfile.email} />
                    <DetailItem label="Phone Number" value={userProfile.phoneNumber} />
                    <DetailItem label="Preferred Contact" value={userProfile.contactMethod} />
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4 border-t pt-8 flex items-center">
                    <Briefcase className="mr-3 h-5 w-5 text-muted-foreground" />
                    Study Preferences
                  </h3>
                  <div className="text-sm space-y-2">
                    <DetailItem icon={<BookOpen />} label="Current Education" value={userProfile.currentEducation} />
                    <DetailItem icon={<Award />} label="Target Degree" value={userProfile.targetDegree} />
                    <DetailItem icon={<Star />} label="Field of Interest" value={userProfile.fieldInterest} />
                    <DetailItem icon={<DollarSign />} label="Annual Budget (USD)" value={userProfile.budgetRangeUSD} />
                    <DetailItem icon={<Globe />} label="Preferred Region" value={userProfile.regionPreference} />
                    <DetailItem icon={<Monitor />} label="Preferred Study Mode" value={userProfile.studyMode} />
                    <DetailItem icon={<Globe />} label="English-Only Programs" value={userProfile.englishOnly} />
                    <DetailItem icon={<Award />} label="Scholarship Interest" value={userProfile.scholarshipInterest} />
                    <DetailItem icon={<Calendar />} label="Desired Start Date" value={userProfile.desiredStartDate} />
                    <DetailItem icon={<Briefcase />} label="Career Goal" value={userProfile.careerGoal} />
                    <DetailItem icon={<Star />} label="Priority Factors" value={userProfile.priorityFactors} />
                     <DetailItem
                      label="Profile Last Updated"
                      value={
                        userProfile.profileUpdatedAt && (userProfile.profileUpdatedAt as any).toDate
                          ? format(
                              (userProfile.profileUpdatedAt as any).toDate(),
                              'PPpp'
                            )
                          : 'Not available'
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        )}
      </div>
    </AdminGuard>
  );
}
