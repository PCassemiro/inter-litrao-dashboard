import { Trophy } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-card-border bg-card-bg px-6 py-4">
      <Trophy className="h-7 w-7 text-emerald" />
      <h1 className="text-xl font-bold tracking-wide text-foreground">
        INTER DE LITRÃO 2026 : DASHBOARD
      </h1>
    </header>
  );
}
