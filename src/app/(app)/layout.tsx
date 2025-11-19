
import AuthCheck from "@/components/auth-check";
import Header from "@/components/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGrid, FileText, User, BookOpen, Clapperboard } from "lucide-react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen w-full flex-col">
        <Header>
           <nav className="flex items-center gap-2 text-sm font-medium">
             <Button variant="ghost" asChild className="justify-start">
                <Link href="/dashboard">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
               <Button variant="ghost" asChild className="justify-start">
                <Link href="/webinars">
                  <Clapperboard className="mr-2 h-4 w-4" />
                  Webinars
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
           </nav>
        </Header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-secondary/40">
          {children}
        </main>
      </div>
    </AuthCheck>
  );
}
