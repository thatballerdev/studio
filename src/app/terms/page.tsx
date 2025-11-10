
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Scale, FileText, Twitter, Linkedin, Facebook } from 'lucide-react';

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

export default function TermsOfServicePage() {
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
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Scale className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-heading">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to you, explained. This is the agreement between you and Northway.
            </p>
             <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <Section title="1. Welcome to Northway!">
                    <p>
                        Hello! Welcome to Northway. These Terms of Service ("Terms") are a binding legal agreement between you and Northway Inc. ("Northway," "we," "us," or "our"). It governs your use of our website, platform, and the services we provide (collectively, the "Services"). By creating an account or using our Services, you're agreeing to these Terms. Think of this as the rulebook for our journey together.
                    </p>
                </Section>
                
                <Section title="2. Our Services: What We Do">
                    <p>
                        Northway is a service designed to help students, particularly from Nigeria, find and apply to affordable, high-quality international university programs. Our services include providing program information, personalized strategy calls, application assistance, and guidance on visas and travel.
                    </p>
                    <p>
                        <strong>Important:</strong> We are a guidance and facilitation service. We are not a university, a scholarship fund, or a government agency. We do not grant degrees, visas, or scholarships ourselves. Our role is to be your expert guide through the process.
                    </p>
                </Section>

                <Section title="3. Your Account and Responsibilities">
                    <p>
                        To use our full Services, you must create an account. You agree to provide accurate, complete, and current information during registration and to keep this information updated. You are responsible for everything that happens under your account, so please keep your password safe and don't share it with anyone.
                    </p>
                    <p>
                        You are also responsible for being honest and transparent with us. The success of our service depends on the accuracy of the information you provide about your academic history, financial situation, and personal goals.
                    </p>
                </Section>

                <Section title="4. Fees and Payments">
                    <p>
                        Creating an account and receiving a 1-on-1 strategy call is completely free. We believe in providing value upfront. We only charge our one-time service fee of $100 (or its equivalent) <strong>after</strong> you have successfully secured both an admission offer from a university and the corresponding student visa.
                    </p>
                    <p>
                        You may also be responsible for separate fees charged by third parties, such as university application fees, visa application fees, or credential evaluation fees. We will always inform you of these potential costs upfront.
                    </p>
                </Section>
                
                <Section title="5. Intellectual Property">
                    <p>
                        All of the content on our website and platform—including the text, graphics, logos, icons, and software—is the property of Northway or our partners. We grant you a limited, non-exclusive license to use our Services for your personal, non-commercial use. You may not copy, reproduce, or distribute our content without our written permission.
                    </p>
                </Section>

                <Section title="6. Disclaimer of Guarantees">
                    <p>
                        We are incredibly proud of our 99% success rate for qualified students who follow our guidance. However, the world of international admissions is complex and subject to change. Therefore, we cannot legally guarantee admission to any specific university or the successful issuance of a student visa. Final decisions are always made by the universities and immigration authorities, respectively.
                    </p>
                    <p>
                        What we <strong>do</strong> guarantee is that we will use our full expertise, network, and effort to give you the absolute best chance of success.
                    </p>
                </Section>

                <Section title="7. Limitation of Liability">
                    <p>
                        To the fullest extent permitted by law, Northway shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                    </p>
                </Section>

                <Section title="8. Changes to These Terms">
                    <p>
                        We may update these Terms from time to time. If we make a change that we believe is material, we will let you know by email or by posting a notice on our site. By continuing to use our Services after those changes become effective, you agree to be bound by the revised Terms.
                    </p>
                </Section>

                 <Section title="9. Contact Us">
                    <p>
                        If you have any questions about these Terms, please don't hesitate to reach out to us. You can contact us at <a href="mailto:legal@northway.com" className="text-primary hover:underline">legal@northway.com</a>.
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
