
"use client";

import { useState } from 'react';
import { useUser } from '@/firebase';
import { universityData } from '@/lib/university-data';
import UniversityCard from '@/components/university-card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleProceedToForm = () => {
    router.push(`/form?email=${user?.email || ''}`);
    setIsFormDialogOpen(false);
  };

  const handleAlreadyFilled = () => {
    setIsFormDialogOpen(false);
    setIsConfirmationOpen(true);
  };

  const OnboardingFormCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-card rounded-2xl shadow-lg border border-border/60 p-8 md:p-12 text-center"
    >
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          className="bg-accent/10 text-accent rounded-full p-4 mb-6 w-20 h-20 flex items-center justify-center"
        >
          <FileText className="h-10 w-10" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Your Journey Starts Here</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Please complete our short onboarding form. This will help us match you with the best universities and programs for your goals.
        </p>
        <Button size="lg" className="font-bold" onClick={() => setIsFormDialogOpen(true)}>
          Fill Onboarding Form <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <div className="container mx-auto space-y-12">
        <OnboardingFormCard />

        <div>
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">University Highlights</h2>
            <p className="text-muted-foreground">Get inspired by some of our partner institutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universityData.slice(0, 3).map((uni, index) => (
              <div key={uni.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <UniversityCard university={uni} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dialog for Form Confirmation */}
      <AlertDialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Onboarding Form</AlertDialogTitle>
            <AlertDialogDescription>
              Have you already completed the onboarding form? It is crucial for building your personalized university plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={handleAlreadyFilled}>
              Yes, I've filled it out
            </Button>
            <AlertDialogAction onClick={handleProceedToForm}>
              No, take me to the form
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog for "Yes" */}
       <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank You!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for completing your profile! Our team will be in touch with you shortly to schedule your 1-on-1 strategy call.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsConfirmationOpen(false)}>
                Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
