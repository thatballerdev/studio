import Link from 'next/link';
import { ArrowRight, BookOpen, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { universityData } from '@/lib/university-data';
import { getFlagEmoji } from '@/lib/utils';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-lg">Northway</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="#">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#">Programs</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-48">
          <div className="container mx-auto text-center px-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#E3F2FD_100%)]"></div>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight mb-6">
                Your Global Education Awaits
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
                Discover affordable, high-quality university programs from around the world. Your future starts here.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Universities</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Explore top institutions that offer quality education at an affordable price.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universityData.slice(0, 3).map((uni, index) => {
                const placeholderImage = PlaceHolderImages.find(p => p.id === uni.imageId);
                return (
                  <div key={index} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${index * 200}ms` }}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="p-0">
                        {placeholderImage && (
                           <Image
                            src={placeholderImage.imageUrl}
                            alt={`Campus of ${uni.name}`}
                            width={600}
                            height={400}
                            className="object-cover w-full h-48"
                            data-ai-hint={placeholderImage.imageHint}
                          />
                        )}
                      </CardHeader>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 flex items-center">{getFlagEmoji(uni.countryCode)}<span className="ml-2">{uni.name}</span></h3>
                        <p className="text-muted-foreground">{uni.country}</p>
                        {uni.id === '1' ? (
                          <p className="font-semibold text-primary mt-4">€2,000 to €6,000 per year for non-medical fields</p>
                        ) : uni.id === '2' ? (
                          <p className="font-semibold text-primary mt-4">€2,000 to €10,000 per year for non-medical fields</p>
                        ) : (
                          <p className="font-semibold text-primary mt-4">€726.72 per semester for non-medical fields</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-20">
            <div className="container mx-auto px-4 text-center">
                 <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Start Your Journey Today</h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Create an account to get personalized university recommendations and start applying.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/signup">
                        Sign Up for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <footer className="py-8 border-t bg-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Northway. Contact: info@northway.com</p>
          </div>
          <div className="flex gap-4 text-muted-foreground">
            <Link href="#" className="hover:text-foreground"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-foreground"><Linkedin size={20} /></Link>
            <Link href="#" className="hover:text-foreground"><Facebook size={20} /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
