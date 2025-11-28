
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Plane, Map, Euro, Heart, Sparkles, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const features = [
    { title: "Tailored to Your Budget", description: "We find destinations and activities that match what you want to spend, ensuring your adventures are affordable." },
    { title: "Fits Your Academic Schedule", description: "All trips are planned around your classes, exams, and holidays, so you never have to choose between your studies and exploring." },
    { title: "Based on Your Interests", description: "Whether you love historical sites, music festivals, beach getaways, or hiking, we build itineraries that reflect your personal passions." },
    { title: "Exclusive Partner Deals", description: "Through our network of travel agencies, we get you access to special pricing and unique experiences you can't find anywhere else." }
];

export default function TravelPage() {
  const planningImage = PlaceHolderImages.find(p => p.id === 'planning');

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
            <Link href="/bridge-program" className="text-foreground/70 hover:text-foreground transition-colors">Bridge Program</Link>
            <Link href="/travel" className="text-foreground transition-colors">Travel</Link>
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
                <Badge variant="outline" className="mb-4 border-accent text-accent font-semibold">Northway Travel</Badge>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 font-heading">
                  Your Education, Your World Adventure
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-10">
                  When you study with Northway, your classroom extends beyond the campus. Our travel package helps you seamlessly explore your continent and the world, turning your study breaks into unforgettable vacations.
                </p>
                <Button size="lg" asChild className="font-bold text-base" style={{ background: 'linear-gradient(90deg, #4DA1FF 0%, #0093E9 100%)' }}>
                    <Link href="#get-started">
                      Learn More
                    </Link>
                  </Button>
              </div>
              <div className="relative h-80 lg:h-auto w-full">
                {planningImage && (
                  <Image
                    src={planningImage.imageUrl}
                    alt="Student planning their travels on a world map"
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

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading">Travel That Revolves Around You</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        We design travel experiences that are perfectly synchronized with your life as a student. This is not a one-size-fits-all service; it's a personalized adventure plan.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-card p-6 rounded-xl border border-border/60"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Sparkles className="h-10 w-10 text-accent mb-4" />
                            <h3 className="font-bold text-xl mb-2 font-heading">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                     ))}
                </div>
            </div>
        </section>
        
        {/* Special Note Section */}
        <section className="w-full py-20 md:py-28 bg-card border-y">
            <div className="container max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <Euro className="h-16 w-16 text-primary mx-auto mb-6 bg-primary/10 p-3 rounded-full" />
                    <h2 className="text-3xl font-bold font-heading">A Special Note for Europe-Bound Students</h2>
                    <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                        P.S. While studying in Europe, it is relatively cheaper to explore the continent and have amazing vacations due to the seamless borders and extensive travel networks. A weekend trip from Prague to Berlin or from Lisbon to Madrid is often just a short, affordable train ride away. This is an unparalleled opportunity to experience dozens of cultures in a way that's much more difficult from other continents.
                    </p>
                </motion.div>
            </section>

        {/* How It Works Section */}
        <section id="get-started" className="py-20 md:py-28 bg-background">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-heading">Your Journey to Discovery</h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                We make saving and planning for your travels simple and transparent, so you can focus on your studies and the adventures ahead.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                  <Card className="p-8">
                    <CardHeader className="p-0 mb-6">
                      <Heart className="h-10 w-10 text-accent mb-3" />
                      <CardTitle className="text-2xl font-heading">Flexible Savings Options</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-base text-muted-foreground space-y-4">
                      <p>Financial planning is key. You can choose to save for your trips in a way that works best for you:</p>
                      <ul className="list-disc list-inside space-y-2 pl-2">
                        <li><b>Save with Northway:</b> Add a small, fixed amount to your monthly plan, and we'll manage a dedicated travel fund for you.</li>
                        <li><b>Save on Your Own:</b> Prefer to manage your own money? No problem. We'll still provide the budget plans and travel deals, and you book them when you're ready.</li>
                      </ul>
                    </CardContent>
                  </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 bg-primary text-primary-foreground">
                  <CardHeader className="p-0 mb-6">
                      <Map className="h-10 w-10 text-white mb-3" />
                      <CardTitle className="text-2xl font-heading">How to Get Started</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-base text-primary-foreground/80 space-y-4">
                      <p>We are putting the final touches on our travel partner network to bring you the best possible experiences.</p>
                      <div className="font-bold text-3xl text-white py-4 text-center bg-black/20 rounded-lg">
                        COMING SOON
                      </div>
                       <p>Once you are an enrolled Northway student, you will be the first to know when this exclusive package becomes available.</p>
                  </CardContent>
                </Card>
              </motion.div>
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
