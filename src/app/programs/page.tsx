
"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProgramCard from '@/components/program-card';
import { courseCategories, programData } from '@/lib/program-data';
import { Search, SlidersHorizontal, Twitter, Linkedin, Facebook, X, ArrowLeft, PlusCircle } from 'lucide-react';
import Logo from '@/components/logo';
import { Input } from '@/components/ui/input';
import type { FeaturedUniversity } from '@/lib/types';
import universityData from '@/lib/featured-universities.json';
import UniversityCard from '@/components/university-card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ProgramsPage() {
  const [degreeLevel, setDegreeLevel] = useState<string>('all');
  const [subject, setSubject] = useState<string>('all');
  const [language, setLanguage] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPrograms = useMemo(() => {
    return programData.filter((program) => {
      const degreeMatch = degreeLevel === 'all' || program.degreeLevel === degreeLevel;
      const subjectMatch = subject === 'all' || program.subject === subject;
      const languageMatch = language === 'all' || program.typicalLanguage === language;
      const searchMatch = searchTerm === '' || 
        program.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.notes.toLowerCase().includes(searchTerm.toLowerCase());
      return degreeMatch && subjectMatch && languageMatch && searchMatch;
    });
  }, [degreeLevel, subject, language, searchTerm]);

  const resetFilters = () => {
    setDegreeLevel('all');
    setSubject('all');
    setLanguage('all');
    setSearchTerm('');
  };

  const activeFilterCount = [
    degreeLevel !== 'all',
    subject !== 'all',
    language !== 'all',
    searchTerm !== '',
  ].filter(Boolean).length;

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
            <Link href="/programs" className="text-foreground transition-colors">Programs</Link>
            <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How it Works</Link>
            <Link href="/travel" className="text-foreground/70 hover:text-foreground transition-colors">Travel</Link>
            <Link href="/bridge-program" className="text-foreground/70 hover:text-foreground transition-colors">Bridge Program</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
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
        <div className="container mx-auto py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4 mb-8 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight font-heading">Explore Programs</h1>
            <p className="text-lg text-muted-foreground">The prices below represent the average cost in Europe, as most of our applicants choose European universities. Many universities in Europe are extremely cheap as they offer free or very low tuition, but this often requires extra steps, language learning, and time. To know more, please register and we will discuss everything in our 1-on-1 call.</p>
          </div>

          <Card className="p-4 md:p-6 mb-8 shadow-sm border-border/60">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center"><SlidersHorizontal className="mr-3 h-5 w-5 text-primary"/>Filter Programs</h2>
                <Button variant="ghost" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                    {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
            </div>
          
            <div className={`grid transition-all duration-300 ${showFilters ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} md:grid-rows-1 md:opacity-100`}>
                <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                       
                        {/* Search Input */}
                        <div className="space-y-2 lg:col-span-3">
                            <Label htmlFor="search">Search by keyword</Label>
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="e.g., 'Software Engineering', 'AI', 'Health'"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Degree Level Dropdown */}
                        <div className="space-y-2">
                            <Label htmlFor="degree-level">Degree Level</Label>
                            <Select value={degreeLevel} onValueChange={setDegreeLevel}>
                                <SelectTrigger id="degree-level">
                                <SelectValue placeholder="Select Degree" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="BSc">Bachelor's</SelectItem>
                                <SelectItem value="MSc">Master's</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Course/Subject Dropdown */}
                        <div className="space-y-2">
                            <Label htmlFor="subject">Course / Subject</Label>
                            <Select value={subject} onValueChange={setSubject}>
                                <SelectTrigger id="subject">
                                <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent className="max-h-96">
                                <SelectItem value="all">All Subjects</SelectItem>
                                {Object.entries(courseCategories).map(([category, subjects]) => (
                                    <SelectGroup key={category}>
                                        <SelectLabel>{category}</SelectLabel>
                                        {subjects.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Language Filter */}
                        <div className="space-y-2">
                            <Label>Language</Label>
                            <RadioGroup value={language} onValueChange={setLanguage} className="flex flex-row space-x-4 pt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="all" id="lang-all" />
                                    <Label htmlFor="lang-all">All</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="English" id="lang-en" />
                                    <Label htmlFor="lang-en">English</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="English + Local" id="lang-en-local" />
                                    <Label htmlFor="lang-en-local">EN + Local</Label>
                                </div>
                            </RadioGroup>
                        </div>

                         {activeFilterCount > 0 && (
                            <div className="md:col-start-3 self-end">
                                <Button onClick={resetFilters} variant="outline" className="w-full">
                                    <X className="mr-2 h-4 w-4" /> Reset Filters ({activeFilterCount})
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </Card>

          {/* Results */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{filteredPrograms.length} Programs Found</h3>
            {filteredPrograms.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program) => (
                    <ProgramCard key={program.courseId} program={program} />
                  ))}
                </div>
                <div className="text-center mt-12 py-8 px-6 rounded-lg border-2 border-dashed border-border bg-card/50">
                  <PlusCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-2xl font-bold font-heading">And many more programs!</h3>
                  <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                    Sign up for free to book a call and get personalized matches based on your information!
                  </p>
                  <Button asChild size="lg" className="mt-6 font-bold" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-16 px-6 rounded-lg border-2 border-dashed border-border bg-card">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">No Programs Match Your Filters</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search criteria to find more results.</p>
                 <Button onClick={resetFilters} variant="secondary" className="mt-6">
                    <X className="mr-2 h-4 w-4" /> Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

       {/* Footer */}
       <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
                <Logo width={100} height={40}/>
                <p className="text-sm text-muted-foreground mt-4">&copy; {new Date().getFullYear()} Northway. All rights reserved.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/about" className="hover:text-primary">About</Link></li>
                    <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
                    <li><Link href="/bridge-program" className="hover:text-primary">Bridge Program</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Connect</h4>
                <div className="flex gap-4 text-muted-foreground">
                    <Link href="#" className="hover:text-primary"><Twitter size={20} /></Link>
                    <Link href="#" className="hover:text-primary"><Linkedin size={20} /></Link>
                    <Link href="#" className="hover:text-primary"><Facebook size={20} /></Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
