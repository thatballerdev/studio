import Logo from "@/components/logo";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="animate-pulse">
            <Logo width={150} height={60} />
        </div>
    </div>
  );
}
