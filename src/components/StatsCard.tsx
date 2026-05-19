"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

type StatsCardProps = {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  subtitle: string;
  icon: ReactNode;
  bars: number[];
  barColor: string;
  tooltip?: string;
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
  tooltip,
}: StatsCardProps) {
  const maxBar = Math.max(...bars, 1);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-muted">{title}</p>
            {tooltip && (
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted-light/20 text-[10px] text-muted hover:bg-muted-light/40 transition-colors"
                  aria-label="Mais informações"
                >
                  ?
                </button>
                {showTooltip && (
                  <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg border border-card-border bg-card-bg px-3 py-2 text-xs text-foreground shadow-lg">
                    {tooltip}
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-card-border bg-card-bg" />
                  </div>
                )}
              </div>
            )}
          </div>
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
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(val / maxBar) * 100}%` }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex-1 rounded-sm transition-all"
            style={{
              backgroundColor: barColor,
              opacity: 0.4 + (i / bars.length) * 0.6,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
