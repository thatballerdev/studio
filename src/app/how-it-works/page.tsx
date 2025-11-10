
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { ArrowLeft, ArrowRight, Briefcase, CalendarDays, Rocket, Plane, ShieldCheck, GitBranch, Dumbbell, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const stepData = [
  {
    icon: Briefcase,
    title: "1. Build Your Profile & Budget",
    description: "The journey begins with you. Our secure onboarding form allows you to create a comprehensive profile that captures your academic background, degree ambitions, financial budget, and personal preferences for countries or regions. This isn't just paperwork; it's the blueprint for your future. By understanding your specific goals and constraints from the start, we can filter out the noise and focus only on opportunities that are a perfect fit for you, saving you countless hours of research."
  },
  {
    icon: CalendarDays,
    title: "2. Personal 1-on-1 Strategy Call",
    description: "Within a week of submitting your profile, we'll schedule a free, no-obligation video call. This is where the magic happens. You'll speak directly with an educational strategist who will review your profile, listen to your story, and answer your most pressing questions. Together, we’ll build a personalized roadmap, identifying the top 3-5 universities that match your criteria for academic quality, affordability, and career goals. You'll leave this call with a clear, actionable plan."
  },
  {
    icon: Rocket,
    title: "3. Fast-Track Admission",
    description: "Once you give us the green light, we activate our network. Thanks to our direct partnerships with university admissions departments, we can often bypass the long queues and bureaucratic hurdles. We handle the application process from start to finish, ensuring every document is perfectly prepared and submitted correctly. Our expertise means we can often secure an official admission offer for you in as little as 48 hours to two weeks—a fraction of the time it would take on your own."
  },
  {
    icon: Plane,
    title: "4. Visa & Travel Prep",
    description: "Securing admission is only half the battle. The visa process can be intimidating, but we make it simple. We provide a complete checklist, help you gather all the necessary financial and personal documents, and guide you through every question on the visa application. Once your visa is approved, we don't stop there. Our team helps you find the best deals on flights and secures safe, convenient student accommodation before you even pack your bags."
  },
  {
    icon: ShieldCheck,
    title: "5. Smooth Arrival & Adaptation",
    description: "Your support system doesn't disappear when you land. We are your partners on the ground. Our 'Smooth Arrival' service is designed to help you settle into your new life. We provide guidance on everything from opening a local bank account and getting health insurance to navigating public transport and finding a part-time job to cover living expenses. We're here to help you adapt and thrive, not just survive."
  },
  {
    icon: GitBranch,
    title: "6. Future Career Pathways",
    description: "Our commitment to your success is long-term. An international degree opens up a world of opportunities, and we help you seize them. We offer guidance on applying for exchange programs to study in yet another country, assist with the credential evaluation process to have your degree recognized in the U.S. or Canada, and provide resources for post-graduation job applications and work visas. We're invested in your journey from student to successful global professional."
  }
];

export default function HowItWorksPage() {
  const planningImage = PlaceHolderImages.find(p => p.id === 'founder-american');

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
            <Link href="/how-it-works" className="text-foreground transition-colors">How it Works</Link>
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
              Your Journey with Northway
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A fully-supported, transparent path to your international, debt-free degree.
            </p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {stepData.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-accent/10 text-accent rounded-full p-5 mb-5">
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">{step.title}</h3>
                                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card border-y">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-accent/10 text-accent rounded-full p-4">
                        <Dumbbell className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">A Special Case: Student-Athletes</h2>
                </div>
                <div className="space-y-6 text-lg text-foreground/80">
                  <p>
                    Are you a talented athlete dreaming of playing at a competitive level while earning your degree? We believe you shouldn't have to choose between your sport and your education. Northway has extensive experience and a dedicated focus on helping student-athletes find the perfect fit.
                  </p>
                  <p>
                    During your 1-on-1 strategy call, we'll dive deep into your athletic profile, your competition history, and your goals. We then leverage our knowledge of European university sports programs to find institutions that not only meet your academic and budget needs but also offer high-quality coaching, excellent facilities, and competitive opportunities in your specific sport.
                  </p>
                   <p>
                    From basketball and football (soccer) to track and field, we help you find a new home where you can excel both in the classroom and on the field.
                  </p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.2 }}>
                {planningImage && (
                  <Image
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXRobGV0ZXxlbnwwfHx8fDE3NjI4MTc3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="A student-athlete training"
                    width={600}
                    height={450}
                    className="rounded-2xl object-cover w-full h-full shadow-xl"
                    data-ai-hint="student athlete training"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-background">
            <div className="container mx-auto px-4 text-center">
                 <motion.div 
                    initial="initial" 
                    whileInView="animate" 
                    variants={fadeIn} 
                    viewport={{ once: true, amount: 0.5 }}
                 >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading max-w-3xl mx-auto">Ready to Start Your Journey?</h2>
                    <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg mb-8">Your personalized path to a debt-free degree is just one click away. Create your free profile to get started.</p>
                    <div className="mt-8">
                        <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                            <Link href="/signup">
                            Create My Free Account
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

    
