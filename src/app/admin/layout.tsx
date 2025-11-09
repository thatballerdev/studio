
import AuthCheck from "@/components/auth-check";
import Header from "@/components/header";
import AdminGuard from "@/components/admin-guard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AdminGuard>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col bg-secondary/40">
            {children}
          </main>
        </div>
      </AdminGuard>
  );
}
