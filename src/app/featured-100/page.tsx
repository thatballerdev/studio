'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import UniversityCard from '@/components/university-card';
import type { FeaturedUniversity } from '@/lib/types';
import universityData from '@/lib/featured-universities.json';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X, ArrowLeft, ArrowRight, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDebounce } from '@/hooks/use-debounce';

const REGIONS = ['All', 'Europe', 'Asia', 'Africa', 'South America'];
const LANGUAGES = ['All', 'English', 'English+Local', 'Local'];

export default function Featured100Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');
  const [language, setLanguage] = useState('All');
  const [showPremium, setShowPremium] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredUniversities = useMemo(() => {
    let universities = universityData as FeaturedUniversity[];
    
    if (debouncedSearchTerm) {
      universities = universities.filter(uni =>
        uni.institution.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        uni.highlights.some(h => h.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }
    
    if (region !== 'All') {
      universities = universities.filter(uni => uni.region === region);
    }

    if (language !== 'All') {
      universities = universities.filter(uni => uni.language === language);
    }

    if (!showPremium) {
        universities = universities.filter(uni => !uni.premium);
    }
    
    return universities;
  }, [debouncedSearchTerm, region, language, showPremium]);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const paginatedUniversities = filteredUniversities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setRegion('All');
    setLanguage('All');
    setShowPremium(false);
    setCurrentPage(1);
  };

  const activeFilterCount = [
    searchTerm !== '',
    region !== 'All',
    language !== 'All',
    showPremium,
  ].filter(Boolean).length;


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
            <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How it Works</Link>
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
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Top 100 Featured Universities</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
              Explore our curated list of affordable, high-quality universities from around the globe.
            </p>
          </div>

          <div className="p-4 md:p-6 mb-8 rounded-lg border bg-card shadow-sm">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="search-input">Search University or Country</Label>
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="search-input"
                        placeholder="e.g., 'Warsaw', 'Engineering', 'Brazil'"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region-select">Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger id="region-select">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language-select">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language-select">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 justify-self-start">
                    <Switch id="premium-switch" checked={showPremium} onCheckedChange={setShowPremium} />
                    <Label htmlFor="premium-switch">Show Premium</Label>
                </div>
                {activeFilterCount > 0 && (
                  <div className="md:col-start-4 self-end">
                      <Button onClick={resetFilters} variant="outline" className="w-full">
                          <X className="mr-2 h-4 w-4" /> Reset Filters ({activeFilterCount})
                      </Button>
                  </div>
                )}
             </div>
          </div>
          
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">{filteredUniversities.length} universities found</p>
          </div>

          {paginatedUniversities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedUniversities.map((uni) => (
                  <motion.div
                    key={uni.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UniversityCard university={uni} />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center items-center gap-4 mt-12">
                  <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
              </div>
            </>
          ) : (
             <div className="text-center py-20 px-6 rounded-lg border-2 border-dashed border-border bg-card">
                <Search className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-2xl font-semibold">No Universities Match Your Filters</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search criteria to find more results.</p>
                 <Button onClick={resetFilters} variant="secondary" className="mt-6">
                    <X className="mr-2 h-4 w-4" /> Clear all filters
                </Button>
              </div>
          )}

        </div>
      </main>

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