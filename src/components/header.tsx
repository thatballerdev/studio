
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { LayoutGrid, LogOut, User, Menu, FileText, Shield } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth, useFirebase, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Logo from '@/components/logo';
import type { UserProfile } from '@/lib/types';

const ADMIN_EMAIL = 'admin@northway.com';

export default function Header({ children }: { children?: React.ReactNode}) {
  const { user } = useUser();
  const auth = useAuth();
  const { firestore } = useFirebase();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        }
      });
      return () => unsubscribe();
    }
  }, [user, firestore]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };
  
  const mobileNavItems = (
    <>
      <SheetClose asChild>
        <Link href="/dashboard" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium">
          <LayoutGrid className="mr-2 h-5 w-5" />
          Dashboard
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link href="/programs" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium">
          <FileText className="mr-2 h-5 w-5" />
          Programs
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link href="/profile" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium">
          <User className="mr-2 h-5 w-5" />
          Profile
        </Link>
      </SheetClose>
      {user?.email === ADMIN_EMAIL && (
         <SheetClose asChild>
          <Link href="/admin/dashboard" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium text-primary">
            <Shield className="mr-2 h-5 w-5" />
            Admin
          </Link>
        </SheetClose>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo width={100} height={40} />
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/dashboard" className="flex items-center gap-2">
                      <Logo width={100} height={40}/>
                  </Link>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {mobileNavItems}
                </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="items-center flex-1 hidden md:flex">
            {children}
        </div>


        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL || undefined} alt="User avatar" />
                  <AvatarFallback>{getInitials(userProfile?.name || user?.displayName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userProfile?.name || user?.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
               <DropdownMenuItem onClick={() => router.push('/programs')}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Programs</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              {user?.email === ADMIN_EMAIL && (
                <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
