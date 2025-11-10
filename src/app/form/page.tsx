
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OnboardingFormPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Dynamically load the Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const getTallySrc = () => {
    const baseUrl = 'https://tally.so/r/D42Wzj';
    const params = new URLSearchParams();
    
    // Forward all existing query parameters to Tally
    searchParams.forEach((value, key) => {
        params.append(key, value);
    });

    // Add required Tally parameters
    params.set('transparentBackground', '1');

    return `${baseUrl}?${params.toString()}`;
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          height: 100%;
          overflow: hidden;
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
