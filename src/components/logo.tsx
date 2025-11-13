import Image from 'next/image';
import { cn } from '@/lib/utils';

const Logo = ({
  className,
  width = 150,
  height = 60,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <>
      {/* Light Mode Logo */}
      <Image
        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*34Npvco8IZMZAPGRf3Q3rQ.png"
        alt="Northway Logo Light"
        width={width}
        height={height}
        className={cn('object-contain dark:hidden', className)}
        data-ai-hint="logo abstract"
        priority
      />
      {/* Dark Mode Logo */}
      <Image
        src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*2jCWNOB04fD_eP-0Lom-bQ.png"
        alt="Northway Logo Dark"
        width={width}
        height={height}
        className={cn('object-contain hidden dark:block', className)}
        data-ai-hint="logo abstract white"
        priority
      />
    </>
  );
};

export default Logo;
