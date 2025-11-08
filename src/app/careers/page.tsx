'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Building, Users, PenTool, Tv, Network } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
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
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-24 md:py-32 text-center bg-card border-b"
        >
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Join Our Mission
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us show American students a world of affordable, high-quality education.
            </p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
          <div className="container max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
            
            {/* Job Description Column */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold font-heading mb-2">
                  Student Ambassador Program
                </h2>
                <p className="text-muted-foreground">
                  Part-time & Remote (U.S. Based)
                </p>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
                <p>
                  Are you a well-connected student in the U.S. who is passionate about global travel and smarter financial choices? Join Northway's mission to show American students that a world-class international education can be more affordable than they think. This is a unique opportunity to build your network, gain marketing experience, and be part of a team disrupting the student debt crisis.
                </p>

                <h3 className="text-2xl font-bold font-heading mt-10 mb-4">What You'll Do:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 text-primary"><Building size={20} /></div>
                    <div><strong>Be the Voice of Northway:</strong> Represent Northway on your campus. You’ll be the go-to person for students interested in studying abroad without breaking the bank.</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 text-primary"><Users size={20} /></div>
                    <div><strong>Drive Registrations:</strong> Your primary goal is to get students to sign up and explore their options on the Northway platform. You’ll host info-sessions, share resources, and use your network to bring new users to the platform.</div>
                  </li>
                   <li className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 text-primary"><PenTool size={20} /></div>
                    <div><strong>Content & Community:</strong> Create engaging content (social media posts, videos, flyers) that highlights the benefits of affordable international degrees and build a campus community around the idea.</div>
                  </li>
                   <li className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 text-primary"><Network size={20} /></div>
                    <div><strong>Provide Feedback:</strong> Act as a bridge between the student body and our product team, providing valuable insights to help us improve the Northway experience for American users.</div>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold font-heading mt-10 mb-4">Who You Are:</h3>
                 <ul>
                  <li>Currently enrolled in a university within the United States.</li>
                  <li>A natural networker with strong communication and social media skills.</li>
                  <li>Creative, self-motivated, and results-oriented.</li>
                  <li>You believe that student debt is a major problem and want to be part of the solution.</li>
                </ul>
              </div>
            </motion.div>

            {/* How to Apply Column */}
             <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Card className="shadow-lg border-border/60 sticky top-28">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    How to Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Ready to make a difference? We'd love to hear from you.
                  </p>
                  <Button asChild size="lg" className="w-full font-bold">
                    <a href="mailto:career@northway.com?subject=Application%20for%20Student%20Ambassador%20Position">
                      <Mail className="mr-3" size={20} /> Email Your Application
                    </a>
                  </Button>
                   <div className="text-sm text-center mt-4 text-muted-foreground">
                    <p>Send your CV and a Cover Letter to:</p>
                    <p className="font-medium text-foreground">career@northway.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link href="/about">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to About Us
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
