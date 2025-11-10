
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Check, Loader2, KeyRound } from 'lucide-react';

import { useUser, useAuth, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/types';

const profileSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email(),
  phoneNumber: z.string().min(10, "Please enter a valid phone number.").optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (user && db) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          const profileData = doc.data() as UserProfile;
          form.reset({
            fullName: profileData.fullName || profileData.name || '',
            email: profileData.email || user.email || '',
            phoneNumber: profileData.phoneNumber || '',
          });
        }
        setLoadingProfile(false);
      });
      return () => unsub();
    } else if (!isUserLoading) {
      setLoadingProfile(false);
    }
  }, [user, isUserLoading, db, form]);


  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    setIsSubmitting(true);

    const dataToUpdate = {
        fullName: data.fullName,
        name: data.fullName,
        phoneNumber: data.phoneNumber,
        profileUpdatedAt: serverTimestamp(),
    };

    try {
      await updateDoc(doc(db, 'users', user.uid), dataToUpdate);
      toast({ title: 'Profile Updated', description: 'Your information has been saved.' });
      router.refresh(); 
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user || !auth) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not send reset email. User not found.' });
        return;
    }
    try {
        await sendPasswordResetEmail(auth, user.email!);
        toast({ title: 'Password Reset Email Sent', description: 'Please check your inbox to reset your password.' });
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  }

  if (isUserLoading || loadingProfile) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  
  return (
    <div className="container mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your personal information.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input readOnly disabled placeholder="Your email address" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl><Input type="tel" placeholder="+1 (555) 123-4567" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Save Changes <Check className="ml-2 h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      </Form>

       <Card className="mt-8">
            <CardHeader>
                <CardTitle>Security</CardTitle>
                 <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" onClick={handlePasswordReset}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Send Password Reset Email
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
