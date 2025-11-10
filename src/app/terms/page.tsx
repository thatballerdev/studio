
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Scale, Twitter, Linkedin, Facebook } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div 
        className="mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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
        </section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <Section title="1. Acceptance of Terms">
                    <p>
                        Welcome to Northway! These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and Northway Inc. ("Northway," "we," "us," or "our"). This agreement governs your access to and use of our website, platform, and all related guidance and facilitation services (collectively, the "Services").
                    </p>
                    <p>
                        By creating an account, accessing our website, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with these Terms, you must not access or use our Services.
                    </p>
                </Section>
                
                <Section title="2. Description of Services & Our Mission">
                    <p>
                        Northway's mission is to combat the student debt crisis by providing students, particularly those facing the high costs of education in regions like the United States and Nigeria, with a clear, supported, and affordable pathway to high-quality international degrees.
                    </p>
                    <p>
                        <strong>Our Role:</strong> We are an expert guidance and facilitation service. We are not a university, a scholarship-granting institution, a financial services provider, or a government agency. Our Service consists of providing information on vetted international universities, personalized strategy development, comprehensive application assistance, and guidance through the visa and relocation process.
                    </p>
                     <p>
                        Our goal is to act as your dedicated partner and advocate, leveraging our expertise to simplify the complex process of studying abroad and empower you to make informed decisions that align with your academic and financial goals.
                    </p>
                </Section>

                <Section title="3. User Accounts and Responsibilities">
                    <p>
                        <strong>Account Creation:</strong> To access the full suite of our Services, you must register for an account. You agree to provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                    </p>
                    <p>
                        <strong>Your Responsibility:</strong> The success of our partnership depends on the accuracy of the information you provide. You are solely responsible for all activities that occur under your account and for maintaining the confidentiality of your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                    </p>
                </Section>

                <Section title="4. Service Fees and Payment Structure">
                    <p>
                        We operate on a "Success-Based" fee model to align our interests directly with yours.
                    </p>
                    <ul className="list-disc list-inside space-y-3">
                      <li><strong>Initial Free Services:</strong> Creating an account, completing your profile, and participating in your initial 1-on-1 strategy call are completely free of charge and carry no obligation.</li>
                      <li><strong>One-Time Service Fee:</strong> A one-time, non-refundable service fee of $100 USD (or the equivalent in your local currency) becomes due only after two conditions are met: (1) you have received an official letter of admission from a university through our Services, AND (2) you have successfully been granted the corresponding student visa.</li>
                      <li><strong>Third-Party Fees:</strong> You acknowledge that you are responsible for any and all fees required by third parties, which are not included in our service fee. These may include, but are not limited to, university application fees, visa application fees, standardized test fees, transcript evaluation fees, and travel costs. We will strive to provide transparency regarding these potential costs.</li>
                    </ul>
                </Section>
                
                <Section title="5. No Guarantee of Admission or Visa">
                    <p>
                        While we pride ourselves on an exceptional success rate for qualified students who follow our guidance, you acknowledge that Northway cannot and does not provide any legal guarantee of university admission or visa approval.
                    </p>
                    <p>
                        The final decisions on all applications rest exclusively with the university admissions departments, and visa issuance is at the sole discretion of the consular officers and immigration authorities of the respective countries. We guarantee to apply our full professional expertise and effort to prepare and guide you, thereby maximizing your chances of a successful outcome. Our Service is the provision of expert guidance, not the guarantee of a specific result.
                    </p>
                </Section>

                <Section title="6. Intellectual Property">
                  <p>All content and materials available on the Northway platform, including but not limited to text, graphics, website name, code, images, and logos, are the intellectual property of Northway Inc. and are protected by applicable copyright and trademark law. Any inappropriate use, including but not limited to the reproduction, distribution, display, or transmission of any content on this site is strictly prohibited, unless specifically authorized by Northway Inc.</p>
                </Section>

                <Section title="7. Limitation of Liability">
                    <p>
                        To the fullest extent permitted by applicable law, in no event shall Northway Inc., its affiliates, directors, employees, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory.
                    </p>
                </Section>

                <Section title="8. Termination">
                    <p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                    <p>If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.</p>
                </Section>

                <Section title="9. Governing Law and Dispute Resolution">
                    <p>These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the state and federal courts located in Delaware for any actions for which we retain the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of our copyrights, trademarks, trade secrets, patents, or other intellectual property rights.</p>
                </Section>

                <Section title="10. Changes to Terms">
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect by posting a notice on our website or sending an email to the address associated with your account. By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms.
                    </p>
                </Section>

                 <Section title="11. Contact Information">
                    <p>
                        If you have any questions about these Terms, please contact us. We believe in open communication and are here to provide clarity.
                    </p>
                    <p>Email: <a href="mailto:legal@northway.com" className="text-primary hover:underline">legal@northway.com</a></p>
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
