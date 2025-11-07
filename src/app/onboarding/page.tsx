
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler, type FieldValues, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { User, ArrowLeft, ArrowRight, Check, Loader2, BookOpen, DollarSign, Target, Globe, Calendar, Briefcase, Award, Monitor, Star } from 'lucide-react';

import { useFirebase } from '@/context/firebase-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import AuthCheck from '@/components/auth-check';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/logo';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { allSubjects } from '@/lib/program-data';

const schemas = [
  z.object({ fullName: z.string().min(2, "Please enter your full name.") }),
  z.object({ currentEducation: z.string().min(1, "Please select your education level.") }),
  z.object({ targetDegree: z.string().min(1, "Please select your target degree.") }),
  z.object({ fieldInterest: z.array(z.string()).min(1, "Please select at least one field.") }),
  z.object({ budgetRangeUSD: z.string().min(1, "Please select your budget.") }),
  z.object({ englishOnly: z.boolean().default(true) }),
  z.object({ regionPreference: z.string().min(1, "Please select a region.") }),
  z.object({ desiredStartDate: z.string().min(4, "Please enter a valid start date.") }),
  z.object({ careerGoal: z.string().optional() }),
  z.object({ scholarshipInterest: z.boolean().default(false) }),
  z.object({ studyMode: z.string().min(1, "Please select a study mode.") }),
  z.object({ priorityFactors: z.array(z.string()).min(1, "Please select at least one priority.") })
];

const steps = [
  { id: 1, title: 'Your Name', schema: schemas[0], icon: User, fields: ['fullName'] as FieldPath<any>[] },
  { id: 2, title: 'Current Education', schema: schemas[1], icon: BookOpen, fields: ['currentEducation'] as FieldPath<any>[] },
  { id: 3, title: 'Target Degree', schema: schemas[2], icon: Target, fields: ['targetDegree'] as FieldPath<any>[] },
  { id: 4, title: 'Field of Interest', schema: schemas[3], icon: Briefcase, fields: ['fieldInterest'] as FieldPath<any>[] },
  { id: 5, title: 'Annual Budget', schema: schemas[4], icon: DollarSign, fields: ['budgetRangeUSD'] as FieldPath<any>[] },
  { id: 6, title: 'Language Preference', schema: schemas[5], icon: Globe, fields: ['englishOnly'] as FieldPath<any>[] },
  { id: 7, title: 'Preferred Region', schema: schemas[6], icon: Globe, fields: ['regionPreference'] as FieldPath<any>[] },
  { id: 8, 'title': 'Start Date', schema: schemas[7], icon: Calendar, fields: ['desiredStartDate'] as FieldPath<any>[] },
  { id: 9, 'title': 'Career Goals', schema: schemas[8], icon: Briefcase, fields: ['careerGoal'] as FieldPath<any>[] },
  { id: 10, 'title': 'Scholarships', schema: schemas[9], icon: Award, fields: ['scholarshipInterest'] as FieldPath<any>[] },
  { id: 11, 'title': 'Study Mode', schema: schemas[10], icon: Monitor, fields: ['studyMode'] as FieldPath<any>[] },
  { id: 12, 'title': 'Your Priorities', schema: schemas[11], icon: Star, fields: ['priorityFactors'] as FieldPath<any>[] },
];

const quotes = [
    "Your future starts here!",
    "Let's find your perfect university.",
    "One step closer to your dream degree.",
    "Tell us what you're passionate about.",
    "Affordable education is within reach.",
    "The world is your campus.",
    "Adventure awaits.",
    "Timing is everything.",
    "Dream big, we'll help you get there.",
    "Financial aid can make it happen.",
    "Learn your way.",
    "What matters most to you?"
];


export default function OnboardingPage() {
  const router = useRouter();
  const { user, userProfile, db } = useFirebase();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  
  const currentSchema = steps[currentStep].schema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
  });
  
  useEffect(() => {
    if (userProfile) {
        const defaultValues = {
            fullName: userProfile.fullName || userProfile.name || '',
            currentEducation: userProfile.currentEducation || '',
            targetDegree: userProfile.targetDegree || '',
            fieldInterest: userProfile.fieldInterest || [],
            budgetRangeUSD: userProfile.budgetRangeUSD || '',
            englishOnly: userProfile.englishOnly ?? true,
            regionPreference: userProfile.regionPreference || '',
            desiredStartDate: userProfile.desiredStartDate || '',
            careerGoal: userProfile.careerGoal || '',
            scholarshipInterest: userProfile.scholarshipInterest ?? false,
            studyMode: userProfile.studyMode || '',
            priorityFactors: userProfile.priorityFactors || [],
        };
        form.reset(defaultValues);
    }
  }, [userProfile, form]);
  
  const processStep: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (user && db) {
        await updateDoc(doc(db, 'users', user.uid), data, { merge: true });
      }
      if (currentStep < steps.length - 1) {
        setDirection(1);
        setCurrentStep(step => step + 1);
      } else {
        await handleFinalSubmit(data);
      }
    } catch (error) {
      console.error("Failed to save or process step", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your progress.' });
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      await form.handleSubmit(processStep)();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  }

  const handleFinalSubmit = async (finalData: FieldValues) => {
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    setIsLoading(true);

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...finalData,
        onboardingComplete: true,
      });

      toast({ title: 'Setup Complete!', description: "We're finding the best universities for you." });
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="flex items-center gap-2 mb-4">
          <Logo />
        </div>
        <p className="text-muted-foreground mb-6">{quotes[currentStep]}</p>

        <Card className="w-full max-w-lg shadow-lg border-border/50 overflow-hidden">
          <CardHeader>
            <Progress value={progress} className="mb-2 h-2" />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span className="font-semibold text-foreground">{steps[currentStep].title}</span>
            </div>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={e => e.preventDefault()} className="min-h-[350px] flex flex-col">
              <CardContent className="flex-grow">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: 300 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 * direction }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {currentStep === 0 && (
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>What’s your full name?</FormLabel>
                          <FormControl><Input autoFocus placeholder="e.g., John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    )}
                     {currentStep === 1 && (
                      <FormField control={form.control} name="currentEducation" render={({ field }) => (
                        <FormItem>
                          <FormLabel>What’s your current level of education?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select level..." /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="High School">High School</SelectItem>
                              <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                              <SelectItem value="Bachelor's">Bachelor’s</SelectItem>
                              <SelectItem value="Master's">Master’s</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    )}
                    {currentStep === 2 && (
                      <FormField control={form.control} name="targetDegree" render={({ field }) => (
                        <FormItem>
                          <FormLabel>What degree are you looking to pursue?</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select degree..." /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="BSc">Bachelor’s / Undergraduate</SelectItem>
                              <SelectItem value="MSc">Master’s / Graduate</SelectItem>
                              <SelectItem value="MD">Medicine / MD</SelectItem>
                              <SelectItem value="Diploma">Diploma</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    )}
                     {currentStep === 3 && (
                      <FormField control={form.control} name="fieldInterest" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Which field or area are you most interested in?</FormLabel>
                          <div className="grid grid-cols-2 gap-2 h-64 overflow-auto p-2 border rounded-md">
                            {allSubjects.map((item) => (
                              <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(field.value.filter((value) => value !== item));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                              </FormItem>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    )}
                    {currentStep === 4 && (
                      <FormField control={form.control} name="budgetRangeUSD" render={({ field }) => (
                         <FormItem>
                            <FormLabel>What’s your annual tuition budget (in USD)?</FormLabel>
                             <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="<5000" /></FormControl>
                                    <FormLabel className="font-normal">&lt; $5,000</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="5000-10000" /></FormControl>
                                    <FormLabel className="font-normal">$5,000 – $10,000</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="10000-15000" /></FormControl>
                                    <FormLabel className="font-normal">$10,000 – $15,000</FormLabel>
                                </FormItem>
                                 <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="15000+" /></FormControl>
                                    <FormLabel className="font-normal">$15,000+</FormLabel>
                                </FormItem>
                            </RadioGroup>
                             <FormMessage />
                        </FormItem>
                      )} />
                    )}
                    {currentStep === 5 && (
                      <FormField control={form.control} name="englishOnly" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Do you prefer to study in English-only programs?</FormLabel>
                            <CardDescription>We'll prioritize programs taught entirely in English.</CardDescription>
                          </div>
                          <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                      )} />
                    )}
                    {currentStep === 6 && (
                        <FormField control={form.control} name="regionPreference" render={({ field }) => (
                             <FormItem>
                                <FormLabel>Do you have a preferred region in Europe?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select region..." /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
                                        <SelectItem value="Western Europe">Western Europe</SelectItem>
                                        <SelectItem value="Central Europe">Central Europe</SelectItem>
                                        <SelectItem value="Nordic">Nordic</SelectItem>
                                        <SelectItem value="No Preference">No Preference</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                    {currentStep === 7 && (
                        <FormField control={form.control} name="desiredStartDate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>What’s your desired start date?</FormLabel>
                                <FormControl><Input placeholder="e.g., September 2025" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                     {currentStep === 8 && (
                        <FormField control={form.control} name="careerGoal" render={({ field }) => (
                            <FormItem>
                                <FormLabel>What’s your career goal? (Optional)</FormLabel>
                                <FormControl><Textarea placeholder="e.g., 'To become an aerospace engineer...'" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                    {currentStep === 9 && (
                        <FormField control={form.control} name="scholarshipInterest" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Interested in scholarship options?</FormLabel>
                            <CardDescription>We'll highlight programs with available scholarships.</CardDescription>
                          </div>
                          <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                        )}/>
                    )}
                    {currentStep === 10 && (
                        <FormField control={form.control} name="studyMode" render={({ field }) => (
                            <FormItem>
                                <FormLabel>What’s your preferred study mode?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select mode..." /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="On-campus">On-campus</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        <SelectItem value="Online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    )}
                    {currentStep === 11 && (
                      <FormField control={form.control} name="priorityFactors" render={() => (
                        <FormItem>
                            <FormLabel>What matters most to you?</FormLabel>
                            <CardDescription>Select your top priorities.</CardDescription>
                            <div className="space-y-2 pt-2">
                                {["Affordable tuition", "English-taught courses", "City life", "International ranking", "Career prospects"].map((item) => (
                                <FormField
                                    key={item}
                                    control={form.control}
                                    name="priorityFactors"
                                    render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(
                                                    (field.value || [])?.filter(
                                                    (value) => value !== item
                                                    )
                                                );
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item}</FormLabel>
                                    </FormItem>
                                    )}
                                />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                      )} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={form.handleSubmit(processStep)} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Finish Setup <Check className="ml-2 h-4 w-4" /></>}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </AuthCheck>
  );
}

    