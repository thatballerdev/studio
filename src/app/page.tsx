import Link from 'next/link';
import { ArrowRight, BookOpen, DollarSign, Globe } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'Global Opportunities',
    description: 'Explore affordable universities from around the world, tailored to your preferences.',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-accent" />,
    title: 'Budget-Friendly',
    description: 'Our focus is on providing options that meet your financial needs without sacrificing quality.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: 'Personalized Feed',
    description: 'Get a custom-curated list of universities that match your profession, interests, and goals.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-lg">Northway</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/signup">Sign Up <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto text-center px-4">
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-10"
              style={{ backgroundImage: heroImage ? `url(${heroImage.imageUrl})` : '' }}
              data-ai-hint={heroImage?.imageHint}
            ></div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/80 to-background"></div>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter mb-4">
                Find Your Path, Not Your Debt
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
                Education with purpose, not pressure. Discover affordable universities that align with your dreams.
              </p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">How Northway Works</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                A simple, personalized journey to your ideal university.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${index * 200}ms` }}>
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
                    <CardHeader className="items-center">
                      <div className="bg-primary/20 p-4 rounded-full">
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto text-center px-4">
            <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-muted-foreground mb-8">
                Sign up today and take the first step towards a brighter, debt-free future.
              </p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">
                  Find My University
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-card">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Northway. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
