
import AuthCheck from "@/components/auth-check";
import Header from "@/components/header";
import { FirebaseClientProvider } from "@/firebase";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FirebaseClientProvider>
      <AuthCheck>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col bg-secondary/40">
            {children}
          </main>
        </div>
      </AuthCheck>
    </FirebaseClientProvider>
  );
}
