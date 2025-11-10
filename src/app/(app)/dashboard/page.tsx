
"use client";

import { useUser } from '@/firebase';
import { universityData } from '@/lib/university-data';
import UniversityCard from '@/components/university-card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'initial' | 'prompted' | 'completed';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const [formState, setFormState] = useState<FormState>('initial');

  // Check local storage on initial load
  useEffect(() => {
    const storedState = localStorage.getItem(`formState-${user?.uid}`);
    if (storedState === 'completed') {
      setFormState('completed');
    }
  }, [user]);

  const handleFillFormClick = () => {
    // Open the Tally form in a new tab
    window.open('https://tally.so/r/D42Wzj', '_blank');
    // Change state to prompt for confirmation
    setFormState('prompted');
  };

  const handleConfirmCompletion = () => {
    setFormState('completed');
    localStorage.setItem(`formState-${user?.uid}`, 'completed');
  };

  const TallyFormCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-card rounded-2xl shadow-lg border border-border/60 p-8 md:p-12 text-center"
    >
      <AnimatePresence mode="wait">
        {formState === 'initial' && (
          <motion.div
            key="initial"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div 
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }} 
                className="bg-accent/10 text-accent rounded-full p-4 mb-6 w-20 h-20 flex items-center justify-center"
            >
                <HelpCircle className="h-10 w-10" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Your Journey Starts Here</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Please complete our short onboarding form. This will help us match you with the best universities and programs for your goals.
            </p>
            <Button size="lg" onClick={handleFillFormClick} className="font-bold">
              Fill Form <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {formState === 'prompted' && (
          <motion.div
            key="prompted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
             <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, ease: 'easeOut' }} className="bg-primary/10 text-primary rounded-full p-4 mb-6 w-20 h-20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Did you complete the form?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Once you've submitted the form, let us know so we can move to the next step.
            </p>
            <Button size="lg" onClick={handleConfirmCompletion} className="font-bold">
              Yes, I've Completed It
            </Button>
          </motion.div>
        )}

        {formState === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
             <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="bg-green-500/10 text-green-500 rounded-full p-4 mb-6 w-20 h-20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Thank You!</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              We've received your information. Our team will review your profile and contact you shortly with the next steps for your application.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="container mx-auto space-y-12">
      <TallyFormCard />

      <div>
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold">University Highlights</h2>
          <p className="text-muted-foreground">Get inspired by some of our partner institutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universityData.slice(0,3).map((uni, index) => (
            <div key={uni.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <UniversityCard university={uni} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
