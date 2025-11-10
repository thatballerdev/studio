
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function TallyForm() {
  const searchParams = useSearchParams();

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
    // The searchParams object is already a URLSearchParams instance, so we can use it directly.
    const params = new URLSearchParams(searchParams.toString());

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

export default function OnboardingFormPage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <TallyForm />
        </Suspense>
    )
}
