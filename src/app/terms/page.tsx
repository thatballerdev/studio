
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
              Our commitment to you, explained. This is the agreement that makes our mission to fight student debt possible.
            </p>
             <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <Section title="1. Our Agreement">
                    <p>
                        Welcome to Northway! These Terms of Service ("Terms") are a binding legal agreement between you and Northway Inc. ("Northway," "we," "us," or "our"). This agreement governs your use of our platform and the guidance services we provide (collectively, the "Services").
                    </p>
                    <p>
                        By creating an account, you're agreeing to these Terms. We've written them to be as clear as possible because our relationship with you is built on trust and a shared goal: finding you a world-class education without the crippling debt that often comes with studying in the U.S.
                    </p>
                </Section>
                
                <Section title="2. Our Mission-Driven Service">
                    <p>
                        Northway exists to solve a huge problem: the overwhelming cost of higher education and the student debt crisis it creates. Our service is designed to provide students, particularly those in the United States and Nigeria, with a clear and affordable path to an international degree.
                    </p>
                    <p>
                        <strong>What We Do:</strong> We are an expert guidance and facilitation service. We've done the hard work of vetting accredited universities abroad that offer high-quality, English-taught programs at a fraction of the cost. Our service includes personalized strategy calls, application support, and guidance on everything from visas to housing.
                    </p>
                     <p>
                        <strong>What We Are Not:</strong> We are not a university, a scholarship fund, or a government agency. We do not grant degrees, visas, or financial aid ourselves. Think of us as your dedicated co-pilot on this journey.
                    </p>
                </Section>

                <Section title="3. Your Part in the Journey">
                    <p>
                        To get the most out of our Services, you agree to provide accurate, complete, and current information when you create your profile. Your honesty is crucial. The more we understand about your academic background, financial situation, and goals, the better we can match you with the perfect university.
                    </p>
                    <p>
                        You are responsible for keeping your account password safe. The success of this journey is a partnership, and it starts with a foundation of clear, truthful communication.
                    </p>
                </Section>

                <Section title="4. Our 'Success-Based' Fee">
                    <p>
                        We are so confident in our ability to help you that we've aligned our success with yours. Creating an account, building your profile, and having a 1-on-1 strategy call with our team is completely free.
                    </p>
                    <p>
                        We only charge our one-time service fee of $100 <strong>after</strong> you have successfully secured both an admission letter from a university and the student visa to go with it. This model ensures we are 100% focused on getting you the result you want.
                    </p>
                     <p>
                        Please note that you may be responsible for separate fees charged by third parties, such as university application fees or visa processing fees. We will always be transparent about these potential costs.
                    </p>
                </Section>
                
                <Section title="5. Guarantees and Reality">
                    <p>
                        We have an exceptional track record (a 99% success rate) of securing admission for qualified students who follow our guidance. However, the world of international admissions is dynamic. Final decisions always rest with the universities and national immigration authorities.
                    </p>
                    <p>
                        Therefore, while we cannot offer an absolute legal guarantee of admission or visa approval, we <strong>do guarantee</strong> our unwavering commitment. We will apply our full expertise, network, and effort to give you the best possible chance of success. Your goal is our goal.
                    </p>
                </Section>

                <Section title="6. Limitation of Liability">
                    <p>
                        To the fullest extent permitted by law, Northway shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our Services. Our service is to guide and assist, but you are ultimately responsible for your decisions and applications.
                    </p>
                </Section>

                <Section title="7. The Future of Our Agreement">
                    <p>
                        We may update these Terms as our service evolves. If we make a change that we believe is significant, we will notify you via email or a notice on our site. By continuing to use our Services after any changes, you agree to the revised Terms.
                    </p>
                </Section>

                 <Section title="8. Questions?">
                    <p>
                        If you have any questions about these Terms, please don't hesitate to ask. Transparency is one of our core values. You can contact us at <a href="mailto:legal@northway.com" className="text-primary hover:underline">legal@northway.com</a>.
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
