import { Goal, Handshake, Users } from "lucide-react";

type TeamOverviewCardProps = {
  totalGols: number;
  totalAssists: number;
  jogadoresAtivos: number;
};

export function TeamOverviewCard({
  totalGols,
  totalAssists,
  jogadoresAtivos,
}: TeamOverviewCardProps) {
  const stats = [
    {
      icon: Goal,
      label: "Total de Gols",
      value: totalGols,
      color: "text-accent-blue",
    },
    {
      icon: Handshake,
      label: "Total de Assistências",
      value: totalAssists,
      color: "text-accent-green",
    },
    {
      icon: Users,
      label: "Jogadores Ativos",
      value: jogadoresAtivos,
      color: "text-accent-purple",
    },
  ];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Visão Geral</h3>
      </div>
      <div className="mt-5 space-y-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div className={`rounded-lg bg-background p-2.5 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
