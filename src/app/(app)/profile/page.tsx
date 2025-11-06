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
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/lib/countries-data';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  profession: z.string().min(2, "Please enter your profession."),
  studyInterest: z.string().min(2, "Please enter your field of study."),
  budget: z.number().min(1000).max(200000),
  preferredCountries: z.array(z.string()).min(1, "Please select at least one country."),
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
      name: userProfile?.name || '',
      profession: userProfile?.profession || '',
      studyInterest: userProfile?.studyInterest || '',
      budget: userProfile?.budget || 20000,
      preferredCountries: userProfile?.preferredCountries || [],
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
      <h1 className="text-3xl font-bold font-headline mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your personal information and university preferences.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
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
              <FormField control={form.control} name="budget" render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Budget: ${field.value.toLocaleString()}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1000} max={200000} step={1000}
                      value={[field.value]}
                      onValueChange={(values) => field.onChange(values[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="preferredCountries" render={() => (
                <FormItem>
                  <FormLabel>Preferred Countries</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {countries.map((country) => (
                      <FormField key={country.code} control={form.control} name="preferredCountries" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-secondary has-[[data-state=checked]]:bg-secondary">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(country.code)}
                              onCheckedChange={(checked) => (
                                checked
                                  ? field.onChange([...field.value, country.code])
                                  : field.onChange(field.value?.filter(v => v !== country.code))
                              )}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{country.name}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Save Changes <Check className="ml-2 h-4 w-4" /></>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
