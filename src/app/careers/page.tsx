
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '@/context/firebase-provider';
import { ArrowLeft, Check, FileText, Loader2, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/logo';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const applicationSchema = z.object({
  applicantName: z.string().min(2, 'Please enter your full name.'),
  applicantEmail: z.string().email('Please enter a valid email address.'),
  applicantDetails: z.string().min(10, 'Please tell us a bit about yourself.').max(5000),
  studentsPerMonth: z.string().min(1, 'Please provide an estimate.'),
  cv: z.any()
    .refine((files) => files?.length === 1, 'CV is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), 'Only .pdf, .doc, and .docx formats are supported.'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function CareersPage() {
  const { db, storage } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      applicantName: '',
      applicantEmail: '',
      applicantDetails: '',
      studentsPerMonth: '',
      cv: undefined,
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
    if (!db || !storage) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Firebase is not initialized. Please try again later.'
        });
        return;
    }

    setIsSubmitting(true);
    try {
      const cvFile = data.cv[0];
      const storageRef = ref(storage, `cvs/${Date.now()}_${cvFile.name}`);
      const uploadResult = await uploadBytes(storageRef, cvFile);
      const cvUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'careerApplications'), {
        applicantName: data.applicantName,
        applicantEmail: data.applicantEmail,
        applicantDetails: data.applicantDetails,
        studentsPerMonth: data.studentsPerMonth,
        cvUrl,
        applicationDate: serverTimestamp(),
      });

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest. We will be in touch shortly.',
        className: 'bg-green-100 border-green-400 text-green-800'
      });
      form.reset();
      setFileName('');
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message || 'Could not submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fileRef = form.register('cv');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-20 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo width={120} height={48} />
          </Link>
          <nav className="ml-10 hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link>
            <Link href="/programs" className="text-foreground/70 hover:text-foreground transition-colors">Programs</Link>
            <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">How it Works</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }} className="font-bold">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-24 md:py-32 text-center bg-card border-b"
        >
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Join Our Mission
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us show American students a world of affordable education.
            </p>
          </div>
        </motion.section>
        
        <section className="py-20 md:py-28">
            <div className="container max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, amount: 0.3 }} 
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold font-heading mb-2">Student Ambassador Program</h2>
                    <p className="text-muted-foreground mb-8">Part-time & Remote (U.S. Based)</p>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
                        <p>Are you a well-connected student in the U.S. who is passionate about global travel and smarter financial choices? Join Northway's mission to show American students that a world-class international education can be more affordable than they think. This is a unique opportunity to build your network, gain marketing experience, and be part of a team disrupting the student debt crisis.</p>

                        <h3 className="text-2xl font-bold font-heading mt-10 mb-4">What You'll Do:</h3>
                        <ul>
                            <li><strong>Be the Voice of Northway:</strong> Represent Northway on your campus. You’ll be the go-to person for students interested in studying abroad without breaking the bank.</li>
                            <li><strong>Drive Registrations:</strong> Your primary goal is to get students to sign up and explore their options on the Northway platform. You’ll host info-sessions, share resources, and use your network to bring new users to the platform.</li>
                            <li><strong>Content & Community:</strong> Create engaging content (social media posts, videos, flyers) that highlights the benefits of affordable international degrees and build a campus community around the idea.</li>
                            <li><strong>Provide Feedback:</strong> Act as a bridge between the student body and our product team, providing valuable insights to help us improve the Northway experience for American users.</li>
                        </ul>

                        <h3 className="text-2xl font-bold font-heading mt-10 mb-4">Who You Are:</h3>
                        <ul>
                            <li>Currently enrolled in a university within the United States.</li>
                            <li>A natural networker with strong communication and social media skills. You know how to get people interested and excited.</li>
                            <li>Creative, self-motivated, and results-oriented. You’re passionate about our mission to make education accessible and are driven to meet your goals.</li>
                            <li>You believe that student debt is a major problem and want to be part of the solution.</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, amount: 0.3 }} 
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <Card className="shadow-xl border-border/60">
                         <CardHeader>
                            <CardTitle className="text-3xl font-heading">Apply Now</CardTitle>
                            <CardDescription>Ready to make a difference? Fill out the form below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField control={form.control} name="applicantName" render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Full Name</FormLabel>
                                              <FormControl><Input placeholder="e.g., Alex Johnson" {...field} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )} />
                                      <FormField control={form.control} name="applicantEmail" render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Email Address</FormLabel>
                                              <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )} />
                                    </div>
                                    <FormField control={form.control} name="applicantDetails" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Why are you a good fit?</FormLabel>
                                            <FormControl><Textarea placeholder="Tell us about your network and your passion for this mission..." {...field} rows={5} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="studentsPerMonth" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>How many students can you confidently bring per month?</FormLabel>
                                            <FormControl><Input placeholder="e.g., 10-15" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    
                                    <FormField
                                        control={form.control}
                                        name="cv"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Upload Your CV/Resume</FormLabel>
                                                <FormControl>
                                                    <label htmlFor="cv-upload" className="relative flex w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 bg-background hover:bg-muted/50 cursor-pointer p-6 transition-colors">
                                                        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                                                            <Upload className="h-8 w-8" />
                                                            {fileName ? (
                                                                <span className="font-semibold text-primary">{fileName}</span>
                                                            ) : (
                                                                <span>Click or drag to upload file</span>
                                                            )}
                                                        </div>
                                                        <Input 
                                                            id="cv-upload"
                                                            type="file" 
                                                            className="sr-only"
                                                            {...fileRef}
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setFileName(file.name);
                                                                }
                                                                // Let react-hook-form handle the state
                                                                fileRef.onChange(e); 
                                                            }}
                                                        />
                                                    </label>
                                                </FormControl>
                                                <FormDescription>PDF, DOC, or DOCX (Max 5MB)</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="pt-4">
                                      <Button type="submit" size="lg" className="w-full font-bold" disabled={isSubmitting}>
                                          {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <>Submit Application <Check className="ml-2 h-5 w-5" /></>}
                                      </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4">
             <div className="text-center">
                 <Link href="/about">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to About Us
                    </Button>
                </Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

    