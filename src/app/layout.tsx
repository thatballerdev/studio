
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { Inter, Nunito_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'Northway',
  description: 'Education with purpose, not pressure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          nunitoSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <FirebaseClientProvider>
            {/* Watermark Div */}
            <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
              <div className="text-center transform -rotate-45">
                <p className="text-[8vw] md:text-[6vw] lg:text-[5rem] font-black tracking-widest uppercase text-foreground/5 opacity-50 whitespace-nowrap">
                  Work In Progress
                </p>
              </div>
            </div>
            {children}
            <Toaster />
            </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
