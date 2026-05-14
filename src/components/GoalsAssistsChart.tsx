"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getGoalsAndAssists } from "@/src/hooks/usePlayerStats";

export function GoalsAssistsChart() {
  const data = getGoalsAndAssists();

  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Gols + Assistência
      </h2>
      <ResponsiveContainer width="100%" height={data.length * 28 + 40}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="nome"
            width={130}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Legend />
          <Bar dataKey="gols" name="Gols" stackId="ga" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="assistencias" name="Assist." stackId="ga" fill="#34d399" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
