"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

import { useFirebase } from '@/context/firebase-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import AuthCheck from '@/components/auth-check';
import { countries } from '@/lib/countries-data';
import Logo from '@/components/logo';
import { Progress } from '@/components/ui/progress';


const step1Schema = z.object({
  profession: z.string().min(2, "Please enter your profession."),
  studyInterest: z.string().min(2, "Please enter your field of study."),
});

const step2Schema = z.object({
  budget: z.number().min(1000, "Budget must be at least $1,000.").max(200000, "Budget cannot exceed $200,000."),
});

const step3Schema = z.object({
  preferredCountries: z.array(z.string()).min(1, "Please select at least one country."),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;
type Step3Values = z.infer<typeof step3Schema>;

type FormValues = Step1Values & Step2Values & Step3Values;

const steps = [
  { id: 1, title: 'About You', description: "What's your current role and what do you want to study?" },
  { id: 2, title: 'Your Budget', description: 'What is your maximum annual budget for tuition?' },
  { id: 3, title: 'Preferred Destinations', description: 'Which countries are you interested in?' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, userProfile, db } = useFirebase();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : step3Schema
    ),
    defaultValues: {
      profession: userProfile?.profession || '',
      studyInterest: userProfile?.studyInterest || '',
      budget: userProfile?.budget || 20000,
      preferredCountries: userProfile?.preferredCountries || [],
    },
  });

  const processStep: SubmitHandler<Partial<FormValues>> = (data) => {
    if (currentStep < steps.length) {
      setCurrentStep(step => step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    setIsLoading(true);

    try {
      const finalData = form.getValues();
      await updateDoc(doc(db, 'users', user.uid), {
        ...finalData,
        onboardingComplete: true,
      });

      toast({ title: 'Setup Complete!', description: "We're finding the best universities for you." });
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
      setIsLoading(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <AuthCheck>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
            <Logo className="h-10 w-10"/>
            <span className="font-bold text-xl">Northway</span>
        </Link>
        <Card className="w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <CardHeader>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="font-headline">Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processStep)}>
              <CardContent className="min-h-[220px]">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="profession" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Profession</FormLabel>
                        <FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="studyInterest" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study Interest</FormLabel>
                        <FormControl><Input placeholder="e.g., Computer Science" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-6 pt-2">
                    <FormField control={form.control} name="budget" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Budget: ${field.value.toLocaleString()}</FormLabel>
                        <FormControl>
                          <Slider
                            min={1000}
                            max={200000}
                            step={1000}
                            value={[field.value]}
                            onValueChange={(values) => field.onChange(values[0])}
                          />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-2">
                    <FormField control={form.control} name="preferredCountries" render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                          {countries.map((country) => (
                            <FormField key={country.code} control={form.control} name="preferredCountries" render={({ field }) => (
                                <FormItem key={country.code} className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-secondary has-[[data-state=checked]]:bg-secondary">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value?.includes(country.code)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                            ? field.onChange([...(field.value || []), country.code])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== country.code
                                                )
                                            )
                                        }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">{country.name}</FormLabel>
                                </FormItem>
                              )
                            } />
                          ))}
                        </div>
                        <FormMessage className="pt-2" />
                      </FormItem>
                    )} />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < steps.length ? (
                  <Button type="submit">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Finish <Check className="ml-2 h-4 w-4" /></>}
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
