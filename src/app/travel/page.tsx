'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { ArrowRight, CheckCircle, Wallet, Plane, Globe, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TravelPage() {
    const travelImage = PlaceHolderImages.find(p => p.id === 'planning');

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
            <Link href="/travel" className="text-foreground transition-colors">Travel</Link>
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
        {/* Hero Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="relative w-full py-24 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-card z-0 border-b"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-accent text-accent font-semibold">Northway Travel</Badge>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 font-heading">
                  Your degree is the ticket. Your travels are the adventure.
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-10">
                  Get tailored vacation plans that fit your class schedule and budget, so you can explore the world while you study abroad, without the stress of planning.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                    <Link href="#waitlist">
                      Join The Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto w-full">
                {travelImage && (
                  <Image
                    src={travelImage.imageUrl}
                    alt="Student planning their future travels on a map"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover w-full h-full shadow-2xl"
                    data-ai-hint={travelImage.imageHint}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Benefits Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading">Explore More, Stress Less</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        Focus on your studies and let us handle the travel plans. Here’s how our travel package makes your adventure seamless.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <div className="bg-card p-8 rounded-2xl border border-border/60">
                        <Plane className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Custom Travel Packages</h3>
                        <p className="text-muted-foreground">Custom travel packages sent to you, based on your budget and interests.</p>
                    </div>
                     <div className="bg-card p-8 rounded-2xl border border-border/60">
                        <Wallet className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Flexible Savings Plans</h3>
                        <p className="text-muted-foreground">Flexible savings plans: save with us monthly or manage it yourself.</p>
                    </div>
                     <div className="bg-card p-8 rounded-2xl border border-border/60">
                        <CheckCircle className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Seamless Experiences</h3>
                        <p className="text-muted-foreground">Seamless booking and unique experiences through our trusted travel agency partners.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Note on Europe */}
        <section className="py-20 md:py-28 bg-card border-y">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-accent/10 text-accent rounded-full p-4">
                        <Globe className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">The Europe Advantage</h2>
                </div>
                <div className="space-y-6 text-lg text-foreground/80">
                  <p>
                    P.S. While studying in Europe, it is relatively cheaper to explore Europe and have cheaper vacations due to the seamless borders compared to other continents. Weekend trips to Paris, Rome, or Prague are not just a dream—they're a real possibility.
                  </p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <Image
                    src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYXJpc3xlbnwwfHx8fDE3NjQzNTYyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="A scenic view of Paris"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover w-full h-full shadow-xl"
                    data-ai-hint="paris"
                  />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Waitlist Section */}
        <section id="waitlist" className="w-full py-24 bg-background">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                 <motion.div 
                    initial="initial" 
                    whileInView="animate" 
                    variants={fadeIn} 
                    viewport={{ once: true, amount: 0.5 }}
                 >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Get Ready for Adventure</h2>
                    <p className="text-muted-foreground mt-4 text-lg mb-8">
                        The Northway Travel Package is coming soon.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                            <Link href="#">
                            Join the waitlist to be the first to know when it launches
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
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
