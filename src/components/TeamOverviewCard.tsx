"use client";

import { motion } from "framer-motion";
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
      label: "Total de Assistencias",
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Visao Geral</h3>
      </div>
      <div className="mt-5 space-y-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className={`rounded-lg bg-background p-2.5 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-foreground"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
