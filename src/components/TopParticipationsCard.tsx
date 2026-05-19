"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Player } from "@/src/constants/mockData";

type TopParticipationsCardProps = {
  players: (Player & { participacoes: number })[];
};

const medalColors: Record<number, { bg: string; border: string }> = {
  0: { bg: "bg-gradient-to-r from-amber-100 to-amber-50", border: "border-l-4 border-l-gold" },
  1: { bg: "bg-gradient-to-r from-gray-100 to-gray-50", border: "border-l-4 border-l-silver" },
  2: { bg: "bg-gradient-to-r from-orange-100 to-orange-50", border: "border-l-4 border-l-bronze" },
};

export function TopParticipationsCard({ players }: TopParticipationsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-gold" />
        <h3 className="text-base font-semibold text-foreground">Top Participacoes (G+A)</h3>
      </div>
      <p className="mt-1 text-xs text-muted">Jogadores com mais contribuicoes para gols</p>
      
      <div className="mt-4 space-y-2">
        {players.map((player, index) => {
          const medal = medalColors[index];
          const isTop3 = index < 3;
          
          return (
            <motion.div
              key={player.nome}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center gap-3 rounded-lg p-3 ${
                isTop3 ? `${medal?.bg} ${medal?.border}` : "bg-background"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isTop3
                    ? index === 0
                      ? "bg-gold text-white"
                      : index === 1
                      ? "bg-silver text-white"
                      : "bg-bronze text-white"
                    : "bg-muted-light/20 text-muted"
                }`}
              >
                {index + 1}
              </span>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {player.nome}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{player.gols}G</span>
                  <span className="text-muted-light">+</span>
                  <span>{player.assistencias}A</span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-lg font-bold text-foreground tabular-nums">
                  {player.participacoes}
                </span>
                <p className="text-[10px] text-muted uppercase tracking-wide">G+A</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
