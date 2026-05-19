import { Sidebar } from "@/src/components/Sidebar";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { DashboardSkeleton } from "@/src/components/Skeletons";

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 pt-20 lg:ml-60 lg:p-6 lg:pt-6">
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-card-border bg-card-bg px-4 py-3 shadow-sm lg:px-5 lg:py-3.5">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="hidden lg:block">
            <ThemeToggle embedded />
          </div>
        </div>

        <DashboardSkeleton />
      </main>
    </div>
  );
}
