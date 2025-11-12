
'use client';

import { useEffect, Suspense } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

// The TallyForm component now accepts the query string as a prop
function TallyForm({ queryString }: { queryString: string }) {
  const { theme } = useTheme();

  useEffect(() => {
    // Dynamically load the Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const getTallySrc = () => {
    const baseUrl = 'https://tally.so/r/D42Wzj';
    const params = new URLSearchParams(queryString);

    // Add required Tally parameters
    params.set('transparentBackground', '1');
    params.set('layout', 'modal');

    // Pass theme information if needed by Tally for styling
    if (theme === 'dark') {
      // Example: Tally might support a 'theme' parameter
      // params.set('theme', 'dark'); 
    }

    return `${baseUrl}?${params.toString()}`;
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          height: 100%;
          overflow: hidden;
          background: transparent !important;
        }
        iframe {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: 0;
        }
      `}</style>
      <iframe
        data-tally-src={getTallySrc()}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="NorthWay Student Onboarding Form"
      ></iframe>
    </>
  );
}

// This new component reads the search params and passes them to TallyForm
function TallyFormWrapper() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  return <TallyForm queryString={queryString} />;
}

// The main page now uses Suspense to wait for the searchParams
export default function OnboardingFormPage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <TallyFormWrapper />
        </Suspense>
    )
}
