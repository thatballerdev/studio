
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { HelpCircle, Mail, MessageSquare, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const faqItems = [
    {
        question: "How do I start the process with Northway?",
        answer: "It's simple! Start by creating a free account and filling out our onboarding form. This gives us the essential information about your academic goals and budget. From there, we'll schedule a free 1-on-1 strategy call to build your personalized plan."
    },
    {
        question: "Is the 1-on-1 strategy call really free?",
        answer: "Yes, completely free and with no obligation. Our goal is to provide you with a clear, actionable plan. We believe in our service so strongly that we're confident you'll want to move forward with us, but you are under no pressure to do so."
    },
    {
        question: "What happens if I don't get admitted to any university?",
        answer: "We have a 99% success rate for qualified students who follow our guidance. Because we work so closely with you and our partner universities, we only recommend programs where you have a very high likelihood of acceptance. In the rare case that things don't work out, we will work with you to find alternative options."
    },
    {
        question: "How does Northway make money if the initial service is free?",
        answer: "Our model is built on your success. We only charge our one-time service fee of $100 *after* you have successfully received both your university admission and your student visa. This aligns our success with yours and keeps us focused on getting you results."
    },
    {
        question: "Can I get help with my visa application?",
        answer: "Absolutely. Our Visa & Travel Prep service is a core part of our offering. We guide you through the entire process, from creating a document checklist to helping you fill out the forms and preparing you for any potential interviews."
    },
];

export default function HelpCenterPage() {
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
            <motion.div
              className="bg-accent/10 text-accent rounded-full p-5 mb-6 inline-flex"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
            >
              <HelpCircle className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Help Center
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome! We're here to help you on your journey. Find answers to common questions or get in touch with our team.
            </p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold font-heading mb-10 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card border-y">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold font-heading mb-4">Still Have Questions?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Our dedicated support team is ready to assist you. Reach out, and we'll get back to you as soon as possible.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <a href="mailto:support@northway.com" className="block p-8 bg-background rounded-lg border hover:border-primary transition-colors h-full">
                                <Mail className="h-10 w-10 text-accent mx-auto mb-4" />
                                <h3 className="text-xl font-semibold font-heading">Email Us</h3>
                                <p className="text-muted-foreground mt-1">For detailed inquiries and document submissions.</p>
                                <p className="text-primary mt-2 font-semibold">support@northway.com</p>
                            </a>
                        </motion.div>
                         <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Link href="/contact" className="block p-8 bg-background rounded-lg border hover:border-primary transition-colors h-full">
                                <MessageSquare className="h-10 w-10 text-accent mx-auto mb-4" />
                                <h3 className="text-xl font-semibold font-heading">Live Chat</h3>
                                <p className="text-muted-foreground mt-1">For quick questions and immediate assistance.</p>
                                <Button className="mt-4">Start a Conversation</Button>
                            </Link>
                        </motion.div>
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
