
'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle, Heart, Twitter, Linkedin, Facebook, CalendarDays, Rocket, Plane, ShieldCheck, Briefcase, GitBranch } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { universityData } from '@/lib/university-data';
import { getFlagEmoji } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import UniversityCard from '@/components/university-card';
import { ThemeToggle } from '@/components/theme-toggle';


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  const faqData = [
    {
      question: "Is using Northway completely free?",
      answer: "Yes, our initial admission service is completely free to get you started. This includes the 1-on-1 strategy call, providing all necessary information based on your onboarding form, and finding the best university matches for you. All of that is provided at no cost. Only after you have received your official admission offer and verified it, we charge a one-time service fee of $150. This fee covers our comprehensive support package, including visa assistance, student-job placement support, flight booking guidance, pre-departure briefings, and accommodation support."
    },
    {
      question: "Are there scholarships available?",
      answer: "Yes, scholarships are available in many instances. However, they are highly dependent on several factors, including your academic performance (CGPA), the specific university and program, and other special circumstances like your field of study or demonstrated leadership skills. We will help you identify and apply for any scholarships you are eligible for during our 1-on-1 call."
    },
    {
      question: "I am an athlete. How can you help me combine sports and studies?",
      answer: "We have extensive experience helping student-athletes. During our 1-on-1 strategy call, we will discuss your athletic profile and goals in detail. We will then focus on finding universities that not only match your academic and budget needs but also have strong sports programs and facilities for your specific sport, ensuring a perfect fit for both your education and athletic career."
    },
    {
      question: "Can I work part-time while studying abroad?",
      answer: "Absolutely. Most countries we work with have visa regulations that allow international students to work part-time (typically around 20 hours per week during semesters and full-time during breaks). This is a great way to cover living expenses, and we provide guidance on finding student jobs as part of our 'Smooth Arrival' support."
    },
    {
      question: "Can I work in the U.S. with a foreign degree?",
      answer: "Yes, it is definitely possible. We partner with accredited universities whose degrees are recognized globally. As part of our career pathway support, we assist with the process of credential evaluation to validate your results for U.S. employers and can guide you on job applications and work visa pathways in the future."
    },
    {
      question: "How long does the entire process take?",
      answer: "The timeline can vary, but our process is designed for speed. After our initial call, we can secure an admission offer in as little as 48 hours to two weeks. The visa application process is the most variable part, typically taking anywhere from 4 to 12 weeks depending on the country. We guide you every step of the way to ensure it’s as fast as possible."
    },
    {
      question: "What kind of universities do you partner with?",
      answer: "We partner with a wide range of accredited public and private universities across Europe and other regions. Our main focus is on institutions that offer a high-quality education and excellent value, allowing students to graduate with little to no debt."
    },
    {
      question: "Do I need to speak a foreign language?",
      answer: "Not necessarily. We specialize in finding English-taught programs. While learning the local language is fantastic for cultural immersion and part-time jobs (and we encourage it!), your degree courses will be in English."
    },
    {
      question: "What does the 'Visa & Travel Prep' service include?",
      answer: "This is our full-service support package. We don't just tell you what to do; we help you do it. This includes helping you gather and correctly fill out all visa documentation, booking your flights to get the best rates, and securing your student accommodation before you travel."
    },
    {
      question: "What if I change my mind about my university or program?",
      answer: "We understand that plans can change. Our 'Future Career Pathways' support includes assistance with switching universities or programs if needed. Our goal is to ensure you are on the right path for your long-term success, and we provide the flexibility to help you get there."
    },
    {
      question: "What is the average annual cost for tuition and living?",
      answer: "This varies by country. In many parts of Eastern and Central Europe, you can find quality programs with tuition from $2,000 - $6,000 per year. Combined with living costs, your total annual budget could be as low as $8,000 - $15,000, which is often less than one year's tuition alone in the U.S."
    },
    {
      question: "What happens after I fill out the onboarding form?",
      answer: "After you submit your profile, our team will review your goals and budget. We will then reach out to you within a few business days to schedule your free, no-obligation 1-on-1 strategy call."
    },
    {
      question: "Do you help with master's degrees or only bachelor's?",
      answer: "We help with both! Whether you are a recent high school graduate looking for a bachelor's degree or a professional seeking a master's program, our process is tailored to find the right fit for your level of study."
    },
    {
      question: "What makes Northway different from other agencies?",
      answer: "Our key difference is our comprehensive, student-first support model and our mission to eradicate student debt. We don't just match you with a school; we manage the entire journey from application to arrival and beyond. Our success is tied to your success, which is why we only charge our service fee after you've secured your admission and visa."
    },
    {
      question: "I have a low GPA. Can I still study abroad?",
      answer: "Yes, there are options available. While a higher GPA opens up more opportunities and scholarships, we work with a diverse range of universities with different entry requirements. Be honest about your academic record in the onboarding form, and we will find a realistic and suitable pathway for you."
    },
    {
      question: "Is life in these European countries boring?",
      answer: "Not at all! One of the biggest advantages of studying in Europe is the incredible access to diverse cultures. You can take a weekend train trip and be in a completely different country in a matter of hours. From the historic streets of Prague to the vibrant arts scene in Berlin, you'll find there's always something new to explore. It's an opportunity to experience life in a way that's hard to replicate in the U.S."
    },
    {
      question: "I'm a huge sports fan. Will I miss out on U.S. sports?",
      answer: "While you might have to stay up late for some NBA or NFL games, you'll be diving into a whole new world of passionate sports culture. European basketball, especially the EuroLeague, is incredibly competitive and exciting. And of course, you'll be in the heart of the football (soccer) world, where the atmosphere on match day is electric. You won't feel left out; you'll just have more sports to love."
    },
    {
      question: "What is your success rate for getting students admitted?",
      answer: "We have a 99% success rate in securing university admission for qualified students who follow our guidance. Because we work so closely with both you and our partner institutions, we ensure that you are applying to programs where you have a very high chance of acceptance. Your success is our success."
    },
    {
      question: "What kind of support do you offer if I have problems after I arrive?",
      answer: "Our 'Smooth Arrival' support doesn't end when you land. We are your support system on the ground. Whether you need help navigating local bureaucracy, are feeling homesick, or need advice on finding a doctor, our team is there to assist you in adapting to your new life."
    },
    {
      question: "Are degrees from these universities recognized in the U.S.?",
      answer: "Yes. We exclusively partner with accredited universities whose degrees are recognized internationally, including in the United States and Canada. As part of our 'Future Career Pathways' support, we even assist with the credential evaluation process to ensure your degree is properly validated for U.S. employers or further education."
    },
    {
      question: "Can my family visit me while I'm studying?",
      answer: "Absolutely! In fact, it's often much easier and cheaper for family to visit you in Europe than it would be for you to fly back to the U.S. for holidays. We can provide guidance on the necessary invitation letters and visa requirements for your family's visit."
    },
    {
      question: "How safe are the countries where you have partner universities?",
      answer: "We prioritize your safety. The countries we operate in, particularly in Central and Eastern Europe, generally have very low crime rates, often lower than major U.S. cities. We provide detailed safety briefings and local contact information to ensure you feel secure in your new home."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      {/* Header */}
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
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 bg-background z-0"></div>
            <div className="container mx-auto text-left px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 !leading-tight font-heading">
                            Study smart. Spend less. Graduate abroad.
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-10 italic">
                            Education with purpose, not pressure.
                        </p>
                        <p className="max-w-xl text-lg md:text-xl text-foreground/80 mb-10">
                            Find accredited English-taught programs under your budget, compare true cost, and apply with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                                <Link href="/signup">
                                Get Started — It’s Free
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="font-bold text-base">
                                <Link href="/programs">
                                Explore Programs
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-foreground/60">
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Accredited partners</div>
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Verified costs</div>
                           <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Scholarship assistance</div>
                        </div>
                    </div>
                    <div className="relative h-64 lg:h-auto lg:w-full animate-fade-up" style={{ animationDelay: '200ms' }}>
                        {heroImage && (
                             <Image
                                src={heroImage.imageUrl}
                                alt="Student exploring global education opportunities"
                                width={600}
                                height={400}
                                className="rounded-2xl object-cover w-full h-full shadow-2xl"
                                data-ai-hint={heroImage.imageHint}
                                priority
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Universities Section */}
        <section className="w-full py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">Some of our partner's university</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">Explore top institutions that offer quality education at an affordable price.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {universityData.filter(uni => uni.featured).slice(0,3).map((uni) => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-20 md:py-28 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">Your Journey with Northway</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">A fully-supported path to your international degree.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 text-center">
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '200ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">1. Profile & Budget</h3>
                  <p className="text-foreground/70">Tell us your degree goals, financial budget, and preferred countries so we can get to work.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '300ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <CalendarDays className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">2. Personal 1-on-1 Call</h3>
                  <p className="text-foreground/70">We’ll schedule a call within a week to discuss your profile and build a personalized strategy.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">3. Fast-Track Admission</h3>
                  <p className="text-foreground/70">With your go-ahead, we leverage our network to secure your admission in as little as 48 hours.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '500ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <Plane className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">4. Visa & Travel Prep</h3>
                  <p className="text-foreground/70">We handle the heavy lifting: visa documents, flight booking, and securing your accommodation.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '600ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">5. Smooth Arrival</h3>
                  <p className="text-foreground/70">We assist with country adaptation, finding student jobs, health insurance, and settling in.</p>
              </div>
              <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '700ms' }}>
                  <div className="bg-accent/10 text-accent rounded-full p-4 mb-4">
                    <GitBranch className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-heading">6. Future Career Pathways</h3>
                  <p className="text-foreground/70">We help with exchange programs, U.S. result validation, and job applications for your future.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="w-full py-20 bg-card border-y">
            <div className="container mx-auto px-4 text-center">
                 <div className="animate-fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading max-w-2xl mx-auto">Create a free account and get 5 verified program matches in minutes.</h2>
                    <div className="mt-8">
                        <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                            <Link href="/signup">
                            Create my free account
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        
        {/* FAQ Section */}
        <section className="w-full py-20 md:py-28">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center mb-16 animate-fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                        Have questions? We've got answers. Here are some of the most common things we get asked.
                    </p>
                </div>
                <div className="animate-fade-up" style={{animationDelay: '200ms'}}>
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
