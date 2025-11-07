
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
import { ArrowLeft, Check, ChevronRight, FileText, Loader2, Upload } from 'lucide-react';

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
  cv: z.any()
    .refine((files) => files?.length === 1, 'CV is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), 'Only .pdf, .doc, and .docx formats are supported.'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
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
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (data) => {
    if (!db || !storage) return;

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
        cvUrl,
        applicationDate: serverTimestamp(),
      });

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest. We will be in touch shortly.',
      });
      form.reset();
      setFileName('');
    } catch (error: any) {
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
      {/* Header */}
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
              Help us empower the next generation of Nigerian leaders.
            </p>
          </div>
        </motion.section>
        
        <section className="py-20 md:py-28">
            <div className="container grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
                        <h2 className="text-3xl font-bold font-heading mb-2">Student Ambassador Program</h2>
                        <p className="text-muted-foreground mb-8">Part-time & Remote</p>

                        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
                            <p>Are you passionate about education and helping your peers achieve their dreams? We are looking for motivated and well-connected students to join our team as Student Ambassadors. This is a unique opportunity to be part of a mission-driven company dedicated to making international education accessible and affordable for Nigerian students.</p>

                            <h3 className="text-2xl font-bold font-heading mt-10 mb-4">What You'll Do:</h3>
                            <ul>
                                <li><strong>Be the Face of Northway:</strong> Represent Northway in your university and local community, sharing our mission to eradicate student debt.</li>
                                <li><strong>Educate and Inform:</strong> Conduct info-sessions and workshops to guide students on the opportunities available for affordable international education.</li>
                                <li><strong>Content Creation:</strong> Create engaging content (videos, blog posts, social media updates) sharing tips and insights about studying abroad affordably.</li>
                                <li><strong>Community Building:</strong> Build a community of aspiring students, providing them with support, resources, and encouragement through their application journey.</li>
                                <li><strong>Market Research:</strong> Gather feedback and insights from students to help us improve our platform and services.</li>
                            </ul>

                            <h3 className="text-2xl font-bold font-heading mt-10 mb-4">Who You Are:</h3>
                            <ul>
                                <li>Currently enrolled in a Nigerian university or a recent graduate.</li>
                                <li>An excellent communicator with strong public speaking and interpersonal skills.</li>
                                <li>Active on social media with a good understanding of what engages a student audience.</li>
                                <li>Self-motivated, organized, and able to work independently.</li>
                                <li>Passionate about our mission and knowledgeable about the challenges Nigerian students face.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
                <aside className="md:col-span-2">
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }}>
                        <Card className="sticky top-28 shadow-lg">
                             <CardHeader>
                                <CardTitle>Apply Now</CardTitle>
                                <CardDescription>Ready to make a difference? Fill out the form below.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="applicantName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl><Input placeholder="e.g., Ada Okoro" {...field} /></FormControl>
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
                                        <FormField control={form.control} name="applicantDetails" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Why are you a good fit?</FormLabel>
                                                <FormControl><Textarea placeholder="Tell us about your passion for this mission and your relevant experience..." {...field} rows={5} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        
                                        <FormField
                                            control={form.control}
                                            name="cv"
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel>Upload Your CV</FormLabel>
                                                    <FormControl>
                                                        <label htmlFor="cv-upload" className="relative flex w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 bg-background hover:bg-muted/50 cursor-pointer p-4 transition-colors">
                                                            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                                                                <Upload className="h-6 w-6" />
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

                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Submit Application <Check className="ml-2 h-4 w-4" /></>}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </aside>
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
