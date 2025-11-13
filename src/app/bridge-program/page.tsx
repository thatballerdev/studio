
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { ArrowRight, CheckCircle, HelpCircle, DollarSign, Calendar, Target, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const faqData = [
  {
    question: "How long does the Bridge Program take?",
    answer: "The program is flexible, typically lasting from 8 to 12 months, which gives you ample time to prepare without feeling rushed. In some cases, motivated students who meet their goals early can complete their objectives in as little as 6 months."
  },
  {
    question: "Why is the Bridge Program different from just waiting a year?",
    answer: "This program is about active, structured preparation, not passive waiting. It provides you with expert guidance, a clear roadmap, and accountability to ensure you're not just passing time, but investing it. You'll enter your university journey more prepared, confident, and financially secure, which leads to a much smoother academic and personal life abroad."
  },
  {
    question: "Do I have to save money through Northway?",
    answer: "No, you don't. We provide expert financial planning and can help you set up a dedicated, high-interest savings account with a trusted banking partner. Our goal is to empower you to manage your finances, not to hold your money. You will always be in full control of your savings."
  },
  {
    question: "Can I join if I'm not sure which country I want to study in?",
    answer: "Absolutely! The Bridge Program is perfect for exploring your options. Our initial sessions will focus on helping you identify the best countries and universities that fit your career goals and budget, giving you clarity and direction for your future."
  }
];

const features = [
    { title: "Personalized Weekly Check-ins", description: "Stay on track with a dedicated 1-on-1 strategy call every single week to monitor progress and adjust your plan." },
    { title: "Custom Financial & Savings Roadmap", description: "We'll build a realistic budget and a step-by-step savings plan to help you meet your tuition and living cost goals." },
    { title: "Language & Test Prep Strategy", description: "Get a clear plan for mastering any required language proficiency tests (like IELTS/TOEFL) or standardized exams (like SAT/GRE)." },
    { title: "Profile Enhancement Plan", description: "We identify gaps in your profile and provide actionable steps to strengthen your university applications, from volunteer work to online courses." }
]

export default function BridgeProgramPage() {
    const planningImage = PlaceHolderImages.find(p => p.id === 'planning');
    const savingImage = PlaceHolderImages.find(p => p.id === 'saving');

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
            <Link href="/bridge-program" className="text-foreground transition-colors">Bridge Program</Link>
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
                <Badge variant="outline" className="mb-4 border-accent text-accent font-semibold">Northway Bridge Program</Badge>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 font-heading">
                  Turn Your Gap Year into a Launchpad
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-10">
                  Not quite ready for university? Our Bridge Program provides the structured support you need to prepare financially, pass language exams, and strengthen your application—all in one transformative year.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                    <Link href="/signup">
                      Start Your Bridge Year
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="font-bold text-base">
                    <Link href="#pricing">
                      View Pricing
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto w-full">
                {planningImage && (
                  <Image
                    src={planningImage.imageUrl}
                    alt="Student planning their future on a map"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover w-full h-full shadow-2xl"
                    data-ai-hint={planningImage.imageHint}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why A Bridge Program? Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading">A Year of Purpose, Not Pause</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        The Northway Bridge Program is for ambitious students who see a gap year not as a delay, but as a strategic advantage. If you're facing hurdles like tuition costs, language barriers, or application requirements, we provide the tools and guidance to overcome them.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <div className="bg-card p-6 rounded-xl border border-border/60">
                        <DollarSign className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Financial Preparedness</h3>
                        <p className="text-muted-foreground">Struggling to meet the budget? We help you create a realistic savings plan, find part-time work, and prepare financially for your studies so you can graduate debt-free.</p>
                    </div>
                     <div className="bg-card p-6 rounded-xl border border-border/60">
                        <Calendar className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Strategic Planning</h3>
                        <p className="text-muted-foreground">Don't have the right language certificate or test score? We'll build a timeline and study plan to ensure you get the qualifications you need, stress-free.</p>
                    </div>
                     <div className="bg-card p-6 rounded-xl border border-border/60">
                        <Target className="h-10 w-10 text-accent mb-4" />
                        <h3 className="font-bold text-xl mb-2 font-heading">Application Excellence</h3>
                        <p className="text-muted-foreground">We turn your application from good to great. We'll identify any weak points and help you build a stronger profile, making you an ideal candidate for your dream university.</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28 bg-card border-y">
            <div className="container max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-heading">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                        Invest in a year of preparation that pays for itself. Choose the plan that works for you.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Monthly Plan */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-heading">Monthly Plan</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <p className="text-5xl font-bold font-heading">$9<span className="text-xl text-muted-foreground">.99</span><span className="text-lg font-normal text-muted-foreground">/month</span></p>
                            <p className="text-muted-foreground">Continuous support for as long as you need it. Perfect for flexible, long-term planning.</p>
                             <ul className="space-y-3 pt-4 border-t">
                                {features.map(feature => (
                                    <li key={feature.title} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                        <span><strong>{feature.title}:</strong> {feature.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                            <Button size="lg" className="w-full font-bold" asChild>
                                <Link href="/signup">Choose Monthly</Link>
                            </Button>
                        </div>
                    </Card>

                    {/* One-Time Plan */}
                    <Card className="border-primary border-2 flex flex-col relative">
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                         <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-heading">One-Time Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <p className="text-5xl font-bold font-heading">$70<span className="text-lg font-normal text-muted-foreground"> / one-time</span></p>
                            <p className="text-muted-foreground">A single payment for up to 12 months of dedicated support. The best value for a full year of prep.</p>
                             <ul className="space-y-3 pt-4 border-t">
                                 {features.map(feature => (
                                    <li key={feature.title} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                        <span><strong>{feature.title}:</strong> {feature.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-0 mt-auto">
                            <Button size="lg" className="w-full font-bold" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }} asChild>
                                <Link href="/signup">Choose One-Time</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-20 md:py-28">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center mb-16">
                    <HelpCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h2 className="text-4xl font-bold font-heading">Bridge Program FAQs</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                        Your questions about the gap year pathway, answered.
                    </p>
                </div>
                <div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqData.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
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
