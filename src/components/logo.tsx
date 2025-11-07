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
      src="https://images.unsplash.com/photo-1762507078313-1259fc0c6a12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500"
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
