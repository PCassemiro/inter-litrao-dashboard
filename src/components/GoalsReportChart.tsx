"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyData } from "@/src/constants/mockData";

type GoalsReportChartProps = {
  data: MonthlyData[];
};

export function GoalsReportChart({ data }: GoalsReportChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
        <h3 className="text-base font-semibold text-foreground">
          Relatório de Gols
        </h3>
        <div className="mt-8 flex items-center justify-center text-sm text-muted">
          Nenhum dado mensal disponível ainda.
        </div>
      </div>
    );
  }

  const chartMinWidth = Math.max(data.length * 70, 320);

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-3 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Relatório de Gols
          </h3>
          <p className="text-xs text-muted">
            Evolução de gols e assistências por mês
          </p>
        </div>
        <span className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted">
          2026
        </span>
      </div>

      <div className="mt-4 -mx-3 overflow-x-auto sm:mx-0">
        <div style={{ minWidth: chartMinWidth, height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ left: 10, right: 20, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGols" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAssists" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Area
              type="monotone"
              dataKey="gols"
              name="Gols"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGols)"
            />
            <Area
              type="monotone"
              dataKey="assistencias"
              name="Assistências"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAssists)"
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
