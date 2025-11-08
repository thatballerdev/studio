import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase, CheckCircle, Heart, Twitter, Linkedin, Facebook, Shield } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { universityData } from '@/lib/university-data';
import { getFlagEmoji } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

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
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 bg-background z-0"></div>
            <div className="container mx-auto text-left px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 !leading-tight font-heading">
                            Study smart. Spend less. Graduate abroad.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-10 italic">
                            Education with purpose, not pressure.
                        </p>
                        <p className="max-w-xl text-lg md:text-xl text-foreground/80 mb-10">
                            Find accredited English-taught programs under your budget, compare true cost, and apply with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                                <Link href="/signup">
                                Get Started — It’s Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="font-bold text-base">
                                <Link href="/programs">
                                Explore Programs
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-foreground/60">
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Accredited partners</div>
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Verified costs</div>
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Scholarship assistance</div>
                        </div>
                    </div>
                    <div className="relative h-64 lg:h-auto lg:w-full animate-fade-up" style={{ animationDelay: '200ms' }}>
                        {heroImage && (
                             <Image
                                src={heroImage.imageUrl}
                                alt="Student exploring global education opportunities"
                                width={600}
                                height={400}
                                className="rounded-2xl object-cover w-full h-full shadow-2xl"
                                data-ai-hint="student globe map abstract"
                                priority
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-20 md:py-28 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">How It Works</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">Your journey to an international degree in 3 simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '200ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">1. Profile & Budget</h3>
                  <p className="text-foreground/70">Tell NorthWay your degree goal, budget, and preferred countries.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">2. Matched Programs</h3>
                  <p className="text-foreground/70">Compare real costs — tuition, living, travel, and visa expenses in one clear view.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '600ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">3. Apply & Save</h3>
                  <p className="text-foreground/70">Auto-draft essays, track applications, and get scholarship matches.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Universities Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">Featured Universities</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Explore top institutions that offer quality education at an affordable price.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universityData.slice(0, 3).map((uni, index) => {
                const placeholderImage = PlaceHolderImages.find(p => p.id === uni.imageId);
                return (
                  <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-xl border">
                      <CardContent className="p-0">
                        {placeholderImage && (
                           <Image
                            src={placeholderImage.imageUrl}
                            alt={`Campus of ${uni.name}`}
                            width={600}
                            height={400}
                            className="object-cover w-full h-48"
                            data-ai-hint={placeholderImage.imageHint}
                          />
                        )}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold font-heading flex-1 pr-2">{uni.name}</h3>
                                <span className="text-2xl">{getFlagEmoji(uni.countryCode)}</span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">{uni.country}</p>
                            <div className="font-semibold text-primary-dark text-lg mb-4">~${uni.annualCost.toLocaleString()} / year</div>
                            <div className="flex flex-wrap gap-2">
                                {uni.highlights.slice(0,2).map(h => <Badge key={h} variant="secondary">{h}</Badge>)}
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="w-full py-20 bg-card border-y">
            <div className="container mx-auto px-4 text-center">
                 <div className="animate-fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading max-w-2xl mx-auto">Create a free account and get 5 verified program matches in minutes.</h2>
                    <div className="mt-8">
                        <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                            <Link href="/signup">
                            Create my free account
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
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
                    <li><Link href="#" className="hover:text-primary">Press</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                    <li><Link href="#" className="hover:text-primary">Guides</Link></li>
                    <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-3 font-heading">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                    <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                    <li><Link href="/login" className="hover:text-primary flex items-center"><Shield className="w-4 h-4 mr-2" />Admin</Link></li>
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
