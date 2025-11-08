
import AuthCheck from "@/components/auth-check";
import Header from "@/components/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthCheck>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col bg-secondary/40">
            {children}
          </main>
        </div>
      </AuthCheck>
  );
}
