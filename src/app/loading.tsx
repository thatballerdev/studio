
"use client";

import { useState, useEffect } from 'react';
import Logo from "@/components/logo";
import { motivationalQuotes } from '@/lib/quotes';

export default function Loading() {
  const [quote, setQuote] = useState({ quote: '', author: '' });

  useEffect(() => {
    // This ensures we get a new random quote on each page load,
    // and it only runs on the client-side to prevent hydration errors.
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center max-w-md p-4 animate-fade-up">
        <div className="animate-pulse mb-8">
          <Logo width={150} height={60} />
        </div>
        {quote.quote && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-lg italic text-foreground">"{quote.quote}"</p>
                <p className="text-sm text-muted-foreground mt-3">- {quote.author}</p>
            </div>
        )}
      </div>
    </div>
  );
}
