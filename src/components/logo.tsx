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
      src="https://scontent.fabv2-2.fna.fbcdn.net/v/t39.30808-6/582415192_122098663035117932_16288885525470881_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF-kk2fqJ2CpkfqxIR4rFIoRhhOX9ma8apGGE5f2ZrxqpB4Xmw_JVKh78LicTJpR5mA3MzjzmXdYpTeqwPgHfBr&_nc_ohc=-F2B40h1WRYQ7kNvwGbJtGm&_nc_oc=Admj8Gar7lMYfUPxSU2YNQBytERW_IYsqfStfVUiMP8K-OAKtQUV3ZQxriRJPqlVzgw&_nc_zt=23&_nc_ht=scontent.fabv2-2.fna&_nc_gid=8aa__VUxbBdGKwY5EM61PA&oh=00_Afh_0c_peo4I1EQeVU8Sc6-_Vjzu6QuPZiCFEZQKher2fA&oe=691AE97A"
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
