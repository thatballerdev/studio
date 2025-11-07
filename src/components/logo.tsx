import Image from 'next/image';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="https://picsum.photos/seed/logo/40/40"
      alt="Northway Logo"
      width={40}
      height={40}
      className={cn('rounded-md', className)}
      data-ai-hint="logo"
    />
  );
};

export default Logo;
