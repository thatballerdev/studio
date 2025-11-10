
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Shield, Twitter, Linkedin, Facebook } from 'lucide-react';

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
              Your privacy is fundamental to our mission. This policy outlines our commitment to protecting your personal information.
            </p>
             <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.section>

        <section className="py-20 md:py-28">
            <div className="container max-w-4xl">
                <Section title="1. Introduction and Our Commitment">
                    <p>
                        Northway Inc. ("Northway," "we," "us," or "our") is dedicated to helping students achieve their educational aspirations without the burden of overwhelming debt. This requires a relationship built on trust. This Privacy Policy details our practices regarding the collection, use, and protection of your personal information when you use our website, platform, and guidance services (collectively, the "Services"). We are committed to transparency and have written this policy to be as clear and straightforward as possible.
                    </p>
                </Section>
                
                <Section title="2. Information We Collect">
                    <p>To provide our personalized Services, we collect information you provide directly, information generated through your use of our Services, and information from third parties.</p>
                    <ul className="list-disc list-inside space-y-3">
                        <li><strong>Personal Identification & Contact Information:</strong> When you create an account, we collect your full name, email address, and password. For detailed guidance, we may also collect your phone number.</li>
                        <li><strong>Onboarding & Profile Information:</strong> Through our onboarding process, we collect detailed information to build your academic and financial profile. This includes your current level of education, target degrees, fields of interest, financial budget for tuition, regional preferences for study, desired start dates, career goals, and other priorities related to your university search.</li>
                        <li><strong>Communications Data:</strong> When you contact us for support, schedule a call, or otherwise communicate with us, we collect the contents of those communications, including metadata.</li>
                        <li><strong>Usage and Technical Data:</strong> We automatically collect information about how you interact with our Services. This includes your IP address, browser type, device information, pages visited, features used, and timestamps of your activities. We use cookies and similar tracking technologies to collect this data.</li>
                    </ul>
                </Section>

                <Section title="3. How and Why We Use Your Information">
                    <p>Our use of your information is driven by our core mission: to provide you with a tailored pathway to your educational goals.</p>
                     <ul className="list-disc list-inside space-y-3">
                        <li><strong>To Provide and Personalize Our Services:</strong> The primary use of your profile information is to match you with suitable universities and programs, build your personalized strategy, and facilitate your applications.</li>
                        <li><strong>To Operate Our Services:</strong> We use your information to create and maintain your account, authenticate you as a user, and ensure the security of our platform.</li>
                        <li><strong>To Communicate With You:</strong> We use your contact information to schedule strategy calls, send critical updates about your applications, provide customer support, and inform you of changes to our Services or policies.</li>
                        <li><strong>For Service Improvement and Analytics:</strong> We analyze usage data to understand user behavior, diagnose technical issues, and improve the functionality, user experience, and effectiveness of our platform.</li>
                        <li><strong>To Comply with Legal Obligations:</strong> We may process your information to comply with applicable laws, regulations, or legal processes, or to respond to valid governmental requests.</li>
                    </ul>
                     <p>
                        <strong>Our Pledge:</strong> We will never sell your personal data to third-party marketers. Your trust is not for sale.
                    </p>
                </Section>

                <Section title="4. How We Share and Disclose Your Information">
                    <p>
                        We share your information only in limited circumstances where it is necessary to provide our Services or as required by law.
                    </p>
                    <ul className="list-disc list-inside space-y-3">
                        <li><strong>University Admissions Departments:</strong> With your explicit consent, we share your application profile and supporting documents with the admissions offices of the universities you have chosen to apply to.</li>
                        <li><strong>Third-Party Service Providers:</strong> We work with trusted vendors and partners who perform services on our behalf. These include secure cloud hosting providers for our data, authentication service providers to manage user logins, and communication platforms. These providers are contractually bound to protect your data and are prohibited from using it for any purpose other than providing services to Northway.</li>
                        <li><strong>Legal and Safety Requirements:</strong> We may disclose your information if we believe in good faith that it is necessary to: (a) comply with a law, regulation, legal process, or governmental request; (b) protect the safety of any person; (c) address fraud, security, or technical issues; or (d) protect Northway's rights or property.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, bankruptcy, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership.</li>
                    </ul>
                </Section>
                
                <Section title="5. Data Security">
                    <p>
                        The security of your personal information is a top priority. We implement a multi-layered security approach, including technical, administrative, and physical safeguards, to protect your data from unauthorized access, use, or disclosure.
                    </p>
                     <p>
                        Our measures include using industry-standard SSL/TLS encryption for all data in transit, encrypting data at rest, employing secure authentication mechanisms, and maintaining strict access controls within our organization. While no system is impenetrable, we are continuously working to improve our security practices to protect your information.
                    </p>
                </Section>

                <Section title="6. Your Rights and Data Choices">
                    <p>
                        You have rights and choices regarding your personal information. Depending on your location, these may include:
                    </p>
                     <ul className="list-disc list-inside space-y-3">
                        <li><strong>Access and Correction:</strong> You can access and update your profile information at any time through your account dashboard.</li>
                        <li><strong>Data Portability:</strong> You may have the right to request a copy of your personal data in a machine-readable format.</li>
                        <li><strong>Deletion:</strong> You can request the deletion of your account and personal data by contacting our support team. Please be aware that we may be required to retain certain information for legal, accounting, or legitimate business purposes.</li>
                        <li><strong>Opt-out of Communications:</strong> You can opt-out of receiving promotional communications from us by following the unsubscribe link in our emails. We will still send you essential transactional messages related to your account and applications.</li>
                    </ul>
                </Section>

                 <Section title="7. International Data Transfers">
                    <p>
                        Northway operates globally, which means your personal information may be transferred to, and processed in, countries other than your own. We take steps to ensure that your data is protected wherever it is processed by implementing appropriate safeguards, such as Standard Contractual Clauses, for transfers of data.
                    </p>
                </Section>

                <Section title="8. Changes to This Policy">
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective.
                    </p>
                </Section>

                <Section title="9. Contact Us">
                    <p>
                        If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact our dedicated privacy team. We are here to help and take your concerns seriously.
                    </p>
                     <p>Email: <a href="mailto:privacy@northway.com" className="text-primary hover:underline">privacy@northway.com</a></p>
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

    