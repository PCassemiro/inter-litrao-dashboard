"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTopAssisters } from "@/src/hooks/usePlayerStats";

export function AssistsChart() {
  const data = getTopAssisters();

  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Assistência
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 0, right: 10, top: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="nome"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10 }}
            height={80}
          />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Bar dataKey="assistencias" name="Assistências" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
