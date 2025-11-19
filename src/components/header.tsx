
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { LayoutGrid, LogOut, User, Menu, FileText, BookOpen, Bell, Check, Clapperboard } from 'lucide-react';
import { collection, doc, onSnapshot, query, orderBy, limit, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth, useFirestore, useUser, useMemoFirebase } from '@/firebase';
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
import type { UserProfile, Notification } from '@/lib/types';
import { ThemeToggle } from './theme-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

function NotificationBell() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const notificationsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [user, firestore]);

  useEffect(() => {
    if (!notificationsQuery) {
        setNotifications([]);
        setUnreadCount(0);
        return;
    };

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const fetchedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Notification[];
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter(n => !n.read).length);
    });

    return () => unsubscribe();
  }, [notificationsQuery]);

  const handleOpenChange = async (open: boolean) => {
    setIsPopoverOpen(open);
    if (open && unreadCount > 0 && firestore && user) {
      const batch = writeBatch(firestore);
      notifications.forEach(notif => {
        if (!notif.read) {
          const notifRef = doc(firestore, 'users', user.uid, 'notifications', notif.id);
          batch.update(notifRef, { read: true });
        }
      });
      await batch.commit();
    }
  };
  
  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4 font-medium border-b">
            Notifications
        </div>
        <ScrollArea className="h-[300px]">
            {notifications.length > 0 ? (
                <div className="divide-y">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 text-sm ${!notif.read ? 'bg-accent/50' : ''}`}>
                            <p className="font-semibold">{notif.title}</p>
                            <p className="text-muted-foreground">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    You have no new notifications.
                </div>
            )}
        </ScrollArea>
         <div className="p-2 border-t text-center">
            <Button variant="link" size="sm" asChild>
                <Link href="#">View all notifications</Link>
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}


export default function Header({ children }: { children?: React.ReactNode}) {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const userProfileRef = useMemoFirebase(() => {
    if (user && firestore) {
      return doc(firestore, 'users', user.uid);
    }
    return null;
  }, [user, firestore]);

  useEffect(() => {
    if (userProfileRef) {
      const unsubscribe = onSnapshot(userProfileRef, (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        }
      });
      return () => unsubscribe();
    }
  }, [userProfileRef]);

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
        <Link href="/webinars" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium">
          <Clapperboard className="mr-2 h-5 w-5" />
          Webinars
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link href="/profile" className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary font-medium">
          <User className="mr-2 h-5 w-5" />
          Profile
        </Link>
      </SheetClose>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={"/dashboard"} className="flex items-center gap-2">
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
                  <Link href={"/dashboard"} className="flex items-center gap-2">
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


        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <NotificationBell />
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
                <>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => router.push('/webinars')}>
                    <Clapperboard className="mr-2 h-4 w-4" />
                    <span>Webinars</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </>
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
