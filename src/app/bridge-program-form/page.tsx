
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

function TallyForm({ queryString }: { queryString: string }) {
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // This function is defined in the script and reloads embeds.
    // We call it to ensure the form loads if the script is already present.
    const loadEmbeds = () => {
        if (typeof (window as any).Tally !== 'undefined') {
            (window as any).Tally.loadEmbeds();
        }
    };
    
    script.onload = loadEmbeds;

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const getTallySrc = () => {
    const baseUrl = 'https://tally.so/embed/XxxlJP';
    // Start with the params from your embed code.
    const params = new URLSearchParams('alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1');
    
    // Append any existing query params from the page URL
    const pageParams = new URLSearchParams(queryString);
    pageParams.forEach((value, key) => {
        params.set(key, value);
    });

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
        title="Bridge Program Application Form"
      ></iframe>
    </>
  );
}

function TallyFormWrapper() {
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() || '';
  return <TallyForm queryString={queryString} />;
}

export default function BridgeProgramFormPage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <TallyFormWrapper />
        </Suspense>
    )
}
