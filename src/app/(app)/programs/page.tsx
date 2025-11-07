
"use client";

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProgramCard from '@/components/program-card';
import { courseCategories, programData, allSubjects } from '@/lib/program-data';
import type { Program } from '@/lib/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ProgramsPage() {
  const [degreeLevel, setDegreeLevel] = useState<string>('all');
  const [subject, setSubject] = useState<string>('all');
  const [budget, setBudget] = useState<number[]>([30000]);
  const [language, setLanguage] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);

  const filteredPrograms = useMemo(() => {
    return programData.filter((program) => {
      const degreeMatch = degreeLevel === 'all' || program.degreeLevel === degreeLevel;
      const subjectMatch = subject === 'all' || program.subject === subject;
      const budgetMatch = program.tuitionRangeEUR.max <= budget[0];
      const languageMatch = language === 'all' || program.typicalLanguage === language;
      return degreeMatch && subjectMatch && budgetMatch && languageMatch;
    });
  }, [degreeLevel, subject, budget, language]);

  return (
    <div className="container mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-heading">Explore Programs</h1>
        <p className="text-lg text-muted-foreground">Find the perfect degree for your goals and budget.</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Degree Level Dropdown */}
                    <div className="space-y-2">
                    <Label htmlFor="degree-level">Degree Level</Label>
                    <Select value={degreeLevel} onValueChange={setDegreeLevel}>
                        <SelectTrigger id="degree-level">
                        <SelectValue placeholder="Select Degree" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="BSc">Bachelor's (BSc)</SelectItem>
                        <SelectItem value="MSc">Master's (MSc)</SelectItem>
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
                        <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {Object.entries(courseCategories).map(([category, subjects]) => (
                            <optgroup key={category} label={category} className="font-semibold pt-2">
                            {subjects.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                            </optgroup>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-2">
                    <Label>Max Annual Tuition: €{budget[0].toLocaleString()}</Label>
                    <Slider
                        value={budget}
                        onValueChange={setBudget}
                        max={30000}
                        step={1000}
                        min={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>€1k</span>
                        <span>€30k+</span>
                    </div>
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
                            <Label htmlFor="lang-en-local">EN+</Label>
                        </div>
                    </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
      </Card>

      {/* Results */}
      <div>
        <h3 className="text-xl font-semibold mb-4">{filteredPrograms.length} Programs Found</h3>
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.courseId} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-lg border-2 border-dashed border-border bg-card">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Programs Match Your Filters</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search criteria to find more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
