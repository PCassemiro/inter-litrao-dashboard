"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Goal, Handshake, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Player } from "@/src/constants/mockData";

type PerformanceGoalChartProps = {
  percentage: number;
  artilheiro: Player;
  garcom: Player;
  totalGols?: number;
  metaAnual?: number;
};

export function PerformanceGoalChart({
  percentage,
  artilheiro,
  garcom,
  totalGols = 0,
  metaAnual = 150,
}: PerformanceGoalChartProps) {
  const data = [
    { name: "completed", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const statusText = percentage >= 100 ? "Meta atingida!" : percentage >= 75 ? "Excelente!" : percentage >= 50 ? "No caminho certo" : "Acelere o ritmo";
  const statusColor = percentage >= 75 ? "text-accent-green" : percentage >= 50 ? "text-accent-yellow" : "text-accent-orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Meta de Performance</h3>
          <p className="text-xs text-muted">Meta anual: {metaAnual} gols</p>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${statusColor}`}>
          <TrendingUp className="h-3.5 w-3.5" />
          {statusText}
        </div>
      </div>

      <div className="relative mx-auto mt-4 h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="var(--accent-green)" />
              <Cell fill="var(--card-border)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{percentage}%</span>
          {totalGols > 0 && (
            <span className="text-xs text-muted">{totalGols}/{metaAnual}</span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-lg bg-background p-2 text-accent-blue">
            <Goal className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted">Artilheiro</p>
            <p className="text-sm font-semibold text-foreground">{artilheiro.nome}</p>
          </div>
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {artilheiro.gols} gols
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-lg bg-background p-2 text-accent-green">
            <Handshake className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted">Garçom</p>
            <p className="text-sm font-semibold text-foreground">{garcom.nome}</p>
          </div>
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {garcom.assistencias} assist
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
