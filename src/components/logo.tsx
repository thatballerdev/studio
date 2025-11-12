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
      src="https://scontent.fabv2-2.fna.fbcdn.net/v/t39.30808-6/582426489_122098670349117932_2698552543375789505_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEuyKIYxW7Dn3qxNqiCzWpe3AeYBFP32h_cB5gEU_faH5nUkc6I6c9jsw6VRekvIgxHxPAH8IA3lOLAgxi7DfDd&_nc_ohc=n7OM5e4Q4l8Q7kNvwFNdotE&_nc_oc=Adns7cww7c5GrMra0kquSCME5Ar_Y2LhMLx45aDVpH-GXQtb0Rwd0vD0eIT1HCODJf4&_nc_zt=23&_nc_ht=scontent.fabv2-2.fna&_nc_gid=6zEUzxWfi9duEpIfYoxObw&oh=00_AfiRgvJMSy7EBW7wC-JdLQppjx8OGGBMLBn0nvoD_qt21g&oe=691ADF4C"
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
