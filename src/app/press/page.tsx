
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Download, PenSquare, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const storyAngles = [
    {
        title: "The Social Mission",
        description: "How two founders from different continents are tackling the global student debt crisis, starting with Nigeria.",
        icon: PenSquare,
    },
    {
        title: "The Technology",
        description: "The tech platform simplifying the complex web of international university admissions and financing.",
        icon: PenSquare,
    },
    {
        title: "The Student-Athlete Angle",
        description: "Unlocking opportunities for talented athletes to pursue sports and education abroad without financial strain.",
        icon: PenSquare,
    },
];

export default function PressPage() {
    const founderNigerian = PlaceHolderImages.find(p => p.id === 'founder-nigerian');
    const founderAmerican = PlaceHolderImages.find(p => p.id === 'founder-american');

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

      <main className="flex-1">
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="py-24 md:py-32 text-center bg-card border-b"
        >
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Our Mission in the Media
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Northway is more than an app; it's a movement to make global education accessible and student debt a thing of the past. Here you'll find everything you need to tell our story.
            </p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
                        <h2 className="text-3xl font-bold font-heading mb-6">For Media Inquiries</h2>
                        <p className="text-lg text-foreground/80 mb-6">
                            We are always happy to connect with journalists, bloggers, and content creators who are passionate about education, technology, and social impact. For interviews, comments, or more information, please reach out to our media team.
                        </p>
                        <Button size="lg" asChild>
                            <a href="mailto:press@northway.com">
                                <Mail className="mr-2 h-5 w-5" /> Contact Our Team
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-16">
                        <h2 className="text-3xl font-bold font-heading mb-8">Story Angles</h2>
                        <div className="space-y-6">
                           {storyAngles.map((angle) => (
                               <div key={angle.title} className="flex items-start gap-4">
                                   <div className="bg-accent/10 text-accent rounded-lg p-3 mt-1">
                                       <angle.icon className="h-6 w-6" />
                                   </div>
                                   <div>
                                       <h3 className="text-xl font-semibold font-heading">{angle.title}</h3>
                                       <p className="text-foreground/70">{angle.description}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </motion.div>
                </div>
                <aside className="md:col-span-1">
                     <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-card border rounded-2xl p-8 sticky top-28">
                        <h3 className="text-2xl font-bold font-heading mb-6">Press Kit</h3>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full justify-start text-base py-6">
                                <Download className="mr-3"/> Fact Sheet
                            </Button>
                             <Button variant="outline" className="w-full justify-start text-base py-6">
                                <Download className="mr-3"/> Logos & Branding
                            </Button>
                             <Button variant="outline" className="w-full justify-start text-base py-6">
                                <Download className="mr-3"/> Founder Headshots
                            </Button>
                        </div>
                        <div className="mt-8">
                             <h4 className="font-semibold mb-3 font-heading">Boilerplate</h4>
                             <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">
                                Northway is a technology platform dedicated to making international education accessible and affordable. By connecting students with high-quality, low-cost university programs worldwide, Northway aims to eliminate student debt and create pathways to global opportunity.
                             </p>
                        </div>
                    </motion.div>
                </aside>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card border-t">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">As Seen In</h2>
            <p className="text-muted-foreground mb-12">We are proud to have our mission featured in publications that care about the future of education.</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8 text-muted-foreground">
                <span className="font-bold text-2xl">Forbes</span>
                <span className="font-bold text-2xl">TechCrunch</span>
                <span className="font-bold text-2xl">University World News</span>
                <span className="font-bold text-2xl">The Guardian</span>
                <span className="font-bold text-2xl">BellaNaija</span>
            </div>
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
                    <li><Link href="/press" className="hover:text-primary">Press</Link></li>
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
