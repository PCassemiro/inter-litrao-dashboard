"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import type { Player } from "@/src/constants/mockData";
import { getPlayerRadarData, getMaxValues } from "@/src/lib/calculations";

type PlayerRadarChartProps = {
  player: Player;
  players: Player[];
  comparePlayer?: Player | null;
};

export function PlayerRadarChart({ player, players, comparePlayer }: PlayerRadarChartProps) {
  const maxValues = getMaxValues(players);
  const playerData = getPlayerRadarData(player, maxValues);
  
  const data = playerData.map((item, index) => ({
    ...item,
    compare: comparePlayer ? getPlayerRadarData(comparePlayer, maxValues)[index].value : undefined,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Perfil do Jogador</h3>
          <p className="text-xs text-muted">Comparativo de atributos</p>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="var(--grid-line)" />
            <PolarAngleAxis
              dataKey="stat"
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-light)", fontSize: 10 }}
            />
            <Radar
              name={player.nome}
              dataKey="value"
              stroke="var(--accent-blue)"
              fill="var(--accent-blue)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            {comparePlayer && (
              <Radar
                name={comparePlayer.nome}
                dataKey="compare"
                stroke="var(--accent-green)"
                fill="var(--accent-green)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--foreground)",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
