"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import type { MonthlyData } from "@/src/constants/mockData";
import { TrendingUp } from "lucide-react";

type EvolutionChartProps = {
  data: MonthlyData[];
};

export function EvolutionChart({ data }: EvolutionChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
        <h3 className="text-base font-semibold text-foreground">
          Evolução Mensal
        </h3>
        <div className="mt-8 flex items-center justify-center text-sm text-muted">
          Nenhum dado mensal disponível ainda.
        </div>
      </div>
    );
  }

  // Calcular dados cumulativos para evolução
  let cumulativeGols = 0;
  let cumulativeAssists = 0;
  const cumulativeData = data.map((item) => {
    cumulativeGols += item.gols;
    cumulativeAssists += item.assistencias;
    return {
      mes: item.mes,
      golsAcumulados: cumulativeGols,
      assistsAcumuladas: cumulativeAssists,
      totalAcumulado: cumulativeGols + cumulativeAssists,
    };
  });

  const lastMonth = cumulativeData[cumulativeData.length - 1];
  const previousMonth = cumulativeData[cumulativeData.length - 2];
  const growth = previousMonth 
    ? ((lastMonth.totalAcumulado - previousMonth.totalAcumulado) / previousMonth.totalAcumulado * 100).toFixed(1)
    : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-card-border bg-card-bg p-3 shadow-sm sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Evolução Acumulada
          </h3>
          <p className="text-xs text-muted">
            Crescimento total ao longo do ano
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-accent-green/30 bg-accent-green/10 px-2.5 py-1.5 text-xs font-medium text-accent-green">
          <TrendingUp className="h-3.5 w-3.5" />
          +{growth}% último mês
        </div>
      </div>

      <div className="mt-4 -mx-3 overflow-x-auto sm:mx-0">
        <div style={{ minWidth: Math.max(data.length * 70, 320), height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cumulativeData}
              margin={{ left: 10, right: 20, top: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "1px solid var(--tooltip-border)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Line
                type="monotone"
                dataKey="golsAcumulados"
                name="Gols Acumulados"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="assistsAcumuladas"
                name="Assistências Acumuladas"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="totalAcumulado"
                name="Total (G+A)"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
