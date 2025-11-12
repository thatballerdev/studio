
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Info, Twitter, Linkedin, Facebook } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeInOut' },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-20 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo width={120} height={48} />
          </Link>
          <nav className="ml-10 hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="text-foreground transition-colors">About</Link>
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
          className="max-w-md"
        >
            <motion.div 
                className="bg-accent/10 text-accent rounded-full p-6 mb-8 inline-flex"
                animate={{ scale: [1, 1.1, 1]}}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            >
                <Info className="h-12 w-12" />
            </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-heading mb-4">
            Coming Soon
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            We're working hard to bring you our full story. Check back soon!
          </p>
        </motion.div>
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
