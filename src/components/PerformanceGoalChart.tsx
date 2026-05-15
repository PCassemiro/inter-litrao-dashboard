"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Goal, Handshake } from "lucide-react";
import type { Player } from "@/src/constants/mockData";

type PerformanceGoalChartProps = {
  percentage: number;
  artilheiro: Player;
  garcom: Player;
};

export function PerformanceGoalChart({
  percentage,
  artilheiro,
  garcom,
}: PerformanceGoalChartProps) {
  const data = [
    { name: "completed", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-foreground">Meta de Performance</h3>
        <p className="text-xs text-muted">Relatório de desempenho mensal</p>
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{percentage}%</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3">
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
        </div>
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </div>
  );
}
