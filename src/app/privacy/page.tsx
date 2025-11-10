
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Shield, FileText, Twitter, Linkedin, Facebook } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div 
        className="mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 pb-2 border-b-2 border-primary">{title}</h2>
        <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">{children}</div>
    </motion.div>
);

export default function PrivacyPolicyPage() {
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              <Shield className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is fundamental to our mission. Here’s how we protect your information.
            </p>
             <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <Section title="1. Our Philosophy on Privacy">
                    <p>
                        At Northway, trust is our most valuable asset. We understand that your dream of studying abroad involves sharing sensitive personal and financial information. This Privacy Policy explains what information we collect, how we use it, and how we keep it safe. We've written it in plain English because we believe transparency is key to earning and keeping your trust.
                    </p>
                </Section>
                
                <Section title="2. What Information We Collect">
                    <p>We collect information in a few different ways to provide and improve our Services:</p>
                    <ul className="list-disc list-inside space-y-3">
                        <li><strong>Information You Provide:</strong> This is the data you give us when you sign up and fill out our onboarding form. It includes your name, email, academic history, field of interest, financial budget, and personal preferences.</li>
                        <li><strong>Information from Your Use of Our Services:</strong> We collect information about how you interact with our website, such as which pages you visit and which programs you view. We use this to make our service better and more relevant to you.</li>
                        <li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us.</li>
                    </ul>
                </Section>

                <Section title="3. How We Use Your Information">
                    <p>We use your information for one primary purpose: to help you achieve your educational goals. Specifically, we use it to:</p>
                     <ul className="list-disc list-inside space-y-3">
                        <li><strong>Personalize Your Experience:</strong> Match you with the universities and programs that are the best fit for your profile and budget.</li>
                        <li><strong>Provide Our Services:</strong> Facilitate your university applications, guide you through visa processes, and offer support.</li>
                        <li><strong>Communicate With You:</strong> Schedule your 1-on-1 strategy call, send you important updates about your applications, and respond to your questions.</li>
                        <li><strong>Improve Our Platform:</strong> Analyze how our users interact with our service so we can identify areas for improvement and make the platform even more effective.</li>
                    </ul>
                     <p>
                        <strong>We will never sell your personal information to third parties. Period.</strong>
                    </p>
                </Section>

                <Section title="4. How We Share Your Information">
                    <p>
                        We only share your information when it is necessary to provide our Services. This is limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-3">
                        <li><strong>Universities:</strong> We share your application information with the admissions departments of the universities you have chosen to apply to.</li>
                        <li><strong>Service Providers:</strong> We work with trusted partners who help us operate our Services, such as cloud hosting providers (like Google Cloud) and authentication services (like Firebase). These partners are contractually obligated to keep your information confidential and secure.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with a legal obligation.</li>
                    </ul>
                </Section>
                
                <Section title="5. Security: How We Protect Your Data">
                    <p>
                        We take the security of your data very seriously. We use a combination of technical, administrative, and physical controls to maintain the security of your data. This includes using industry-standard encryption (like HTTPS) for data in transit and at rest, and strictly limiting access to your personal information to only those Northway employees who need it to do their jobs.
                    </p>
                </Section>

                <Section title="6. Your Rights and Choices">
                    <p>
                        You have rights over your personal data. You can access, update, or correct the information in your Northway profile at any time. If you wish to delete your account, you can do so by contacting our support team. Please note that we may need to retain certain information for legal or legitimate business purposes.
                    </p>
                </Section>

                <Section title="7. Contact Us">
                    <p>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please get in touch. We're here to help. You can email our privacy team at <a href="mailto:privacy@northway.com" className="text-primary hover:underline">privacy@northway.com</a>.
                    </p>
                </Section>
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
