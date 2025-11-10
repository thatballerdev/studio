
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Briefcase, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeInOut' },
};

export default function CareersPage() {
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

      <main className="flex-1 flex items-center justify-center text-center p-4">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="max-w-xl"
        >
            <motion.div 
                className="bg-accent/10 text-accent rounded-full p-6 mb-8 inline-flex"
                animate={{ scale: [1, 1.1, 1]}}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                <Briefcase className="h-12 w-12" />
            </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-heading mb-4">
            Join Our Future Team
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We are not currently seeking applicants, but our team is always growing. We believe in connecting with great talent early. Check back soon for future opportunities to help us revolutionize education.
          </p>
          <div className="mt-10">
             <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Learn More About Our Mission
                </Link>
            </Button>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Northway. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
