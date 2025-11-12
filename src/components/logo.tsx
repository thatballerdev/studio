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
    <Image
      src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*34Npvco8IZMZAPGRf3Q3rQ.png"
      alt="Northway Logo"
      width={width}
      height={height}
      className={cn('object-contain', className)}
      data-ai-hint="logo abstract"
      priority
    />
  );
};

export default Logo;
