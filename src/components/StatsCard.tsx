import type { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  subtitle: string;
  icon: ReactNode;
  bars: number[];
  barColor: string;
};

export function StatsCard({
  title,
  value,
  trend,
  trendUp,
  subtitle,
  icon,
  bars,
  barColor,
}: StatsCardProps) {
  const maxBar = Math.max(...bars);

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span
              className={`text-xs font-medium ${trendUp ? "text-accent-green" : "text-accent-red"}`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-light">{subtitle}</p>
        </div>
        <div className="rounded-lg bg-background p-2 text-muted">{icon}</div>
      </div>
      <div className="mt-4 flex items-end gap-1 h-8">
        {bars.map((val, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{
              height: `${(val / maxBar) * 100}%`,
              backgroundColor: barColor,
              opacity: 0.4 + (i / bars.length) * 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
