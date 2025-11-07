"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, CheckCircle, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export default function AboutPage() {
  const founderNigerian = PlaceHolderImages.find(p => p.id === 'founder-nigerian');
  const founderAmerican = PlaceHolderImages.find(p => p.id === 'founder-american');

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
          className="py-24 md:py-32 lg:py-40 text-center bg-card border-b"
        >
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Our Story
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Two friends. Two continents. One shared belief: Education should be a bridge, not a burden.
            </p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">A Journey Born from Frustration</h2>
                <div className="space-y-6 text-lg text-foreground/80">
                  <p>
                    For one of our founders, the dream of studying abroad felt like an impossible maze. Growing up in Nigeria, he saw education as the ultimate key to opportunity. He spent countless nights researching universities, drafting essays, and navigating the complex world of international admissions. The biggest hurdle? Funding.
                  </p>
                  <p>
                    He applied for dozens, if not hundreds, of scholarships. Each rejection was a blow, but also a lesson. The information was scattered, the requirements were opaque, and the process was overwhelmingly geared against those without insider knowledge. He realized the problem wasn't a lack of talent or ambition in Nigeria; it was a lack of access and clarity.
                  </p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdHVkZW50cyUyMGNvbGxhYm9yYXRpb258ZW58MHx8fHwxNzYyNTUwNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="A student researching on a laptop"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-full shadow-xl"
                  data-ai-hint="student research frustrated"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-card">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="order-2 md:order-1">
                 <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0d28lMjBwZW9wbGUlMjBwbGFubmluZ3xlbnwwfHx8fDE3NjI1NTA4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Two people collaborating on a whiteboard"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-full shadow-xl"
                  data-ai-hint="founders planning strategy"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.2 }} className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">A Bridge Across the Atlantic</h2>
                <div className="space-y-6 text-lg text-foreground/80">
                   <p>
                    Meanwhile, his friend in the United States was witnessing a different side of the same problem. He saw friends and colleagues graduating with crippling student loan debt—a financial burden that dictated their career choices, delayed life milestones, and stifled their entrepreneurial spirit. The American dream, it seemed, came with a hefty price tag.
                  </p>
                  <p>
                    A conversation sparked an idea. What if they could combine their experiences? The Nigerian founder's hard-won knowledge of navigating international admissions and the American founder's understanding of the devastating impact of student debt. They realized they weren't just solving a logistical problem; they were tackling a systemic issue.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28 text-center">
             <div className="container max-w-3xl">
                <motion.div initial="initial" whileInView="animate" variants={fadeIn} viewport={{ once: true, amount: 0.5 }}>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Mission: Education Without the Debt Sentence</h2>
                    <div className="space-y-6 text-xl text-foreground/80">
                        <p>
                            Northway was born from this shared mission. We believe that financial constraints should never be a barrier to a world-class education. We are obsessed with finding high-quality, accredited, and affordable university programs around the globe that empower students, not indebt them.
                        </p>
                        <p className="font-semibold text-primary-dark">
                            Our focus is clear: to eradicate student debt in Nigeria, one student at a time, by providing the information, tools, and support that we wish we'd had.
                        </p>
                    </div>
                </motion.div>
             </div>
        </section>

        <section className="py-20 md:py-28 bg-card border-t">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">The Founders</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div initial="initial" whileInView="animate" variants={fadeIn} viewport={{ once: true, amount: 0.5 }} transition={{delay: 0.1}} className="flex flex-col items-center text-center">
                {founderNigerian && (
                  <Image
                    src={founderNigerian.imageUrl}
                    alt="Nigerian Founder"
                    width={150}
                    height={150}
                    className="rounded-full object-cover mb-6 shadow-lg"
                    data-ai-hint={founderNigerian.imageHint}
                  />
                )}
                <h3 className="text-2xl font-bold font-heading">Onem Ibrahim Danazumi</h3>
                <p className="text-primary font-semibold mb-2">Co-Founder & CEO</p>
                <p className="text-foreground/70 mb-4">
                  The visionary who turned his scholarship-hunting marathon into a roadmap for others. Onem is dedicated to democratizing access to global education for every Nigerian student.
                </p>
              </motion.div>
              <motion.div initial="initial" whileInView="animate" variants={fadeIn} viewport={{ once: true, amount: 0.5 }} transition={{delay: 0.3}} className="flex flex-col items-center text-center">
                {founderAmerican && (
                  <Image
                    src={founderAmerican.imageUrl}
                    alt="American Founder"
                    width={150}
                    height={150}
                    className="rounded-full object-cover mb-6 shadow-lg"
                    data-ai-hint={founderAmerican.imageHint}
                  />
                )}
                <h3 className="text-2xl font-bold font-heading">Edmund Amos</h3>
                <p className="text-primary font-semibold mb-2">Co-Founder & CTO</p>
                <p className="text-foreground/70 mb-4">
                  The architect of our platform, Edmund is passionate about using technology to solve real-world problems. He’s on a mission to build the tools that make affording an education simpler and more transparent.
                </p>
              </motion.div>
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
