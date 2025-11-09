
'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { collection, query, doc, getDoc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
import { Loader2, Users, Search, Download } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

// This is a hidden component used for generating the PDF
const PdfContent = ({ userProfile, innerRef }: { userProfile: UserProfile, innerRef: React.Ref<HTMLDivElement> }) => {
    if (!userProfile) return null;
    return (
        <div ref={innerRef} className="p-8 bg-white text-black" style={{ width: '210mm' }}>
             <div className="text-center mb-8">
                <div className="flex justify-center mb-2"><Logo width={120} height={40}/></div>
                <p className="text-sm italic text-gray-500">Education with purpose, not pressure.</p>
            </div>
            <div className="text-center border-b pb-6 mb-6">
                <h1 className="text-3xl font-bold">{userProfile.fullName || userProfile.name}</h1>
                <p className="text-md text-gray-600">{userProfile.email}</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-6">
                    <div><p className="font-semibold text-gray-500">Phone Number</p><p>{userProfile.phoneNumber || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Contact Method</p><p>{userProfile.contactMethod || 'N/A'}</p></div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4 border-t pt-6">Study Preferences</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div><p className="font-semibold text-gray-500">Target Degree</p><p>{userProfile.targetDegree || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Current Education</p><p>{userProfile.currentEducation || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Annual Budget (USD)</p><p>{userProfile.budgetRangeUSD || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Preferred Region</p><p>{userProfile.regionPreference || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Desired Start Date</p><p>{userProfile.desiredStartDate || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">Study Mode</p><p>{userProfile.studyMode || 'N/A'}</p></div>
                    <div><p className="font-semibold text-gray-500">English-Only</p><p>{userProfile.englishOnly ? 'Yes' : 'No'}</p></div>
                    <div><p className="font-semibold text-gray-500">Scholarship Interest</p><p>{userProfile.scholarshipInterest ? 'Yes' : 'No'}</p></div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-500 text-sm">Career Goal</p>
                    <p className="text-sm mt-1">{userProfile.careerGoal || 'N/A'}</p>
                </div>
                
                <div className="mt-4">
                    <p className="font-semibold text-gray-500 text-sm">Fields of Interest</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.fieldInterest?.map(item => <span key={item} className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{item}</span>) || 'N/A'}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-500 text-sm">Priority Factors</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.priorityFactors?.map(item => <span key={item} className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{item}</span>) || 'N/A'}
                    </div>
                </div>

                <div className="text-xs text-gray-400 mt-8 border-t pt-2">
                    Profile Last Updated: {userProfile.profileUpdatedAt && (userProfile.profileUpdatedAt as any).toDate ? format((userProfile.profileUpdatedAt as any).toDate(), 'PPpp') : 'Not available'}
                </div>
            </div>
        </div>
    );
};


export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [pdfData, setPdfData] = useState<UserProfile | null>(null);
  const [displayedUsers, setDisplayedUsers] = useState<UserProfile[]>([]);

  const usersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'users')) : null),
    [firestore]
  );

  const { data: users, isLoading, error } = useCollection<UserProfile>(usersQuery);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(user =>
        (user.fullName || user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedUsers(filtered);
    }
  }, [users, searchTerm]);
  
  const generatePdf = (profile: UserProfile) => {
    return new Promise<void>((resolve) => {
        setPdfData(profile);
        
        // Wait for the state to update and the hidden div to render
        setTimeout(() => {
            const input = pdfRef.current;
            if (!input) {
                console.error("PDF content element not found.");
                setIsDownloading(null);
                resolve();
                return;
            }

            html2canvas(input, { scale: 2, useCORS: true, backgroundColor: null })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'pt', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const imgProps = pdf.getImageProperties(imgData);
                    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
                    pdf.save(`NorthWay_Profile_${profile.fullName?.replace(' ', '_') || profile.uid}.pdf`);
                    
                    setIsDownloading(null);
                    setPdfData(null); // Clear the data after download
                    resolve();
                });
        }, 100);
    });
  };

  const handleDownloadClick = async (userId: string) => {
    if (!userId) {
        console.error("User ID is missing. Cannot download PDF.");
        return;
    }
    if (!firestore) {
        console.error("Firestore is not available.");
        return;
    }
    setIsDownloading(userId);
    try {
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            await generatePdf(userDoc.data() as UserProfile);
        } else {
            console.error("User not found for PDF generation.");
            setIsDownloading(null);
        }
    } catch (error) {
        console.error("Error downloading PDF:", error);
        setIsDownloading(null); // Reset button on error
    }
  };


  return (
    <AdminGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Users className="mr-3 h-8 w-8" />
          Admin Dashboard
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Registered Users ({displayedUsers?.length || 0})</CardTitle>
             <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            {!isLoading && displayedUsers && (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Onboarding Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedUsers.map((user) => (
                      <TableRow
                        key={user.uid}
                        className="group"
                      >
                        <TableCell 
                          onClick={() => router.push(`/admin/users/${user.uid}`)}
                          className="font-medium cursor-pointer hover:underline"
                        >
                          {user.fullName || user.name}
                        </TableCell>
                        <TableCell onClick={() => router.push(`/admin/users/${user.uid}`)} className="cursor-pointer">{user.email}</TableCell>
                        <TableCell onClick={() => router.push(`/admin/users/${user.uid}`)} className="cursor-pointer">
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
                        <TableCell className="text-right">
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDownloadClick(user.uid)}
                              disabled={isDownloading === user.uid}
                            >
                              {isDownloading === user.uid ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                           </Button>
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
      {/* Hidden div for rendering PDF content */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, color: '#000' }}>
        {pdfData && <PdfContent userProfile={pdfData} innerRef={pdfRef} />}
      </div>
    </AdminGuard>
  );
}
