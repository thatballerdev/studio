
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { Check, Loader2 } from 'lucide-react';

import { useFirebase } from '@/context/firebase-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { allSubjects } from '@/lib/program-data';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const profileSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  currentEducation: z.string().min(1, "Please select your education level."),
  targetDegree: z.string().min(1, "Please select your target degree."),
  fieldInterest: z.array(z.string()).min(1, "Please select at least one field."),
  budgetRangeUSD: z.string().min(1, "Please select your budget."),
  englishOnly: z.boolean().default(true),
  regionPreference: z.string().min(1, "Please select a region."),
  desiredStartDate: z.string().min(4, "Please enter a valid start date."),
  careerGoal: z.string().optional(),
  scholarshipInterest: z.boolean().default(false),
  studyMode: z.string().min(1, "Please select a study mode."),
  priorityFactors: z.array(z.string()).min(1, "Please select at least one priority.")
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { user, userProfile, loading, db } = useFirebase();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: userProfile?.fullName || userProfile?.name || '',
      currentEducation: userProfile?.currentEducation || '',
      targetDegree: userProfile?.targetDegree || '',
      fieldInterest: userProfile?.fieldInterest || [],
      budgetRangeUSD: userProfile?.budgetRangeUSD || '',
      englishOnly: userProfile?.englishOnly ?? true,
      regionPreference: userProfile?.regionPreference || '',
      desiredStartDate: userProfile?.desiredStartDate || '',
      careerGoal: userProfile?.careerGoal || '',
      scholarshipInterest: userProfile?.scholarshipInterest ?? false,
      studyMode: userProfile?.studyMode || '',
      priorityFactors: userProfile?.priorityFactors || [],
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user || !db) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    setIsLoading(true);

    try {
      await updateDoc(doc(db, 'users', user.uid), data);
      toast({ title: 'Profile Updated', description: 'Your preferences have been saved.' });
      router.refresh(); // To refetch data on dashboard
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your personal information and university preferences.</p>
      
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Preferences</CardTitle>
              <CardDescription>These settings help us personalize your university feed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <FormField control={form.control} name="currentEducation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Current level of education</FormLabel>
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
              <FormField control={form.control} name="targetDegree" render={({ field }) => (
                <FormItem>
                  <FormLabel>Target degree</FormLabel>
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
               <FormField control={form.control} name="fieldInterest" render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of interest</FormLabel>
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
              <FormField control={form.control} name="budgetRangeUSD" render={({ field }) => (
                 <FormItem>
                    <FormLabel>Annual tuition budget (in USD)</FormLabel>
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
               <FormField control={form.control} name="englishOnly" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">English-only programs</FormLabel>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="regionPreference" render={({ field }) => (
                   <FormItem>
                      <FormLabel>Preferred region</FormLabel>
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
               <FormField control={form.control} name="desiredStartDate" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Desired start date</FormLabel>
                      <FormControl><Input placeholder="e.g., September 2025" {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )}/>
              <FormField control={form.control} name="careerGoal" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Career goal (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="e.g., 'To become an aerospace engineer...'" {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )}/>
              <FormField control={form.control} name="scholarshipInterest" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Scholarship interest</FormLabel>
                </div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              </FormItem>
              )}/>
               <FormField control={form.control} name="studyMode" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Preferred study mode</FormLabel>
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
              <FormField control={form.control} name="priorityFactors" render={() => (
                <FormItem>
                    <FormLabel>Priorities</FormLabel>
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
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Save Changes <Check className="ml-2 h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
