"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Player } from "@/src/constants/mockData";

type TopRankingCardProps = {
  title: string;
  players: Player[];
  valueKey: "gols" | "assistencias";
  valueSuffix: string;
  showMVP?: boolean;
};

const medalColors: Record<number, { bg: string; text: string }> = {
  0: { bg: "bg-amber-100 text-amber-700", text: "text-amber-600" },
  1: { bg: "bg-gray-100 text-gray-500", text: "text-gray-500" },
  2: { bg: "bg-orange-100 text-orange-700", text: "text-orange-600" },
};

export function TopRankingCard({
  title,
  players,
  valueKey,
  valueSuffix,
  showMVP = false,
}: TopRankingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-4 space-y-3">
        {players.map((player, index) => {
          const medal = medalColors[index];
          const isMVP = showMVP && index === 0;
          return (
            <motion.div
              key={player.nome}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center gap-3 ${isMVP ? "relative" : ""}`}
            >
              {isMVP && (
                <div className="absolute -left-1 -top-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                </div>
              )}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  medal?.bg ?? "bg-gray-50 text-gray-400"
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium text-foreground truncate ${isMVP ? "flex items-center gap-1" : ""}`}>
                  {player.nome}
                  {isMVP && (
                    <span className="text-[10px] font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">
                      MVP
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted">{player.jogos} jogos</p>
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {player[valueKey]} {valueSuffix}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
