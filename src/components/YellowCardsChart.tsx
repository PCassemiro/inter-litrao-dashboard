"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getYellowCards } from "@/src/hooks/usePlayerStats";

export function YellowCardsChart() {
  const data = getYellowCards();

  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Cartão Amarelo
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="nome"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10 }}
            height={80}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Line
            type="monotone"
            dataKey="cartoesAmarelos"
            name="Amarelos"
            stroke="#eab308"
            strokeWidth={2}
            dot={{ fill: "#eab308", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
