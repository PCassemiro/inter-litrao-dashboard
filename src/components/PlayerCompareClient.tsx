"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Player } from "@/src/constants/mockData";
import { PlayerRadarChart } from "@/src/components/PlayerRadarChart";
import { getPlayerAverages } from "@/src/lib/calculations";

type PlayerCompareClientProps = {
  players: Player[];
};

const avatarColors: Record<string, string> = {
  A: "bg-rose-100 text-rose-700",
  B: "bg-sky-100 text-sky-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  E: "bg-lime-100 text-lime-700",
  F: "bg-blue-100 text-blue-700",
  G: "bg-emerald-100 text-emerald-700",
  H: "bg-violet-100 text-violet-700",
  I: "bg-pink-100 text-pink-700",
  J: "bg-teal-100 text-teal-700",
  K: "bg-cyan-100 text-cyan-700",
  L: "bg-indigo-100 text-indigo-700",
  M: "bg-purple-100 text-purple-700",
  N: "bg-fuchsia-100 text-fuchsia-700",
  P: "bg-red-100 text-red-700",
  R: "bg-green-100 text-green-700",
  S: "bg-yellow-100 text-yellow-700",
  T: "bg-slate-200 text-slate-700",
  V: "bg-zinc-200 text-zinc-700",
  W: "bg-stone-200 text-stone-700",
};

function getAvatarColor(name: string) {
  const initial = name.charAt(0);
  return avatarColors[initial] ?? "bg-gray-100 text-gray-700";
}

export function PlayerCompareClient({ players }: PlayerCompareClientProps) {
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const filtered1 = useMemo(() => {
    if (!search1) return players.slice(0, 10);
    return players
      .filter((p) => p.nome.toLowerCase().includes(search1.toLowerCase()))
      .slice(0, 10);
  }, [players, search1]);

  const filtered2 = useMemo(() => {
    if (!search2) return players.slice(0, 10);
    return players
      .filter((p) => p.nome.toLowerCase().includes(search2.toLowerCase()))
      .slice(0, 10);
  }, [players, search2]);

  const selectPlayer1 = (p: Player) => {
    setPlayer1(p);
    setSearch1("");
    setShowDropdown1(false);
  };

  const selectPlayer2 = (p: Player) => {
    setPlayer2(p);
    setSearch2("");
    setShowDropdown2(false);
  };

  const compareStats = useMemo(() => {
    if (!player1 || !player2) return null;
    
    const avg1 = getPlayerAverages(player1);
    const avg2 = getPlayerAverages(player2);

    return [
      {
        label: "Gols",
        value1: player1.gols,
        value2: player2.gols,
        winner: player1.gols > player2.gols ? 1 : player2.gols > player1.gols ? 2 : 0,
      },
      {
        label: "Assistências",
        value1: player1.assistencias,
        value2: player2.assistencias,
        winner: player1.assistencias > player2.assistencias ? 1 : player2.assistencias > player1.assistencias ? 2 : 0,
      },
      {
        label: "G+A",
        value1: player1.gols + player1.assistencias,
        value2: player2.gols + player2.assistencias,
        winner: (player1.gols + player1.assistencias) > (player2.gols + player2.assistencias) ? 1 : (player2.gols + player2.assistencias) > (player1.gols + player1.assistencias) ? 2 : 0,
      },
      {
        label: "Jogos",
        value1: player1.jogos,
        value2: player2.jogos,
        winner: player1.jogos > player2.jogos ? 1 : player2.jogos > player1.jogos ? 2 : 0,
      },
      {
        label: "Gols/Jogo",
        value1: avg1.golsPerJogo,
        value2: avg2.golsPerJogo,
        winner: parseFloat(avg1.golsPerJogo) > parseFloat(avg2.golsPerJogo) ? 1 : parseFloat(avg2.golsPerJogo) > parseFloat(avg1.golsPerJogo) ? 2 : 0,
      },
      {
        label: "Assist./Jogo",
        value1: avg1.assistsPerJogo,
        value2: avg2.assistsPerJogo,
        winner: parseFloat(avg1.assistsPerJogo) > parseFloat(avg2.assistsPerJogo) ? 1 : parseFloat(avg2.assistsPerJogo) > parseFloat(avg1.assistsPerJogo) ? 2 : 0,
      },
      {
        label: "Cartões",
        value1: player1.cartoesAmarelos + player1.cartoesVermelhos,
        value2: player2.cartoesAmarelos + player2.cartoesVermelhos,
        winner: (player1.cartoesAmarelos + player1.cartoesVermelhos) < (player2.cartoesAmarelos + player2.cartoesVermelhos) ? 1 : (player2.cartoesAmarelos + player2.cartoesVermelhos) < (player1.cartoesAmarelos + player1.cartoesVermelhos) ? 2 : 0,
      },
    ];
  }, [player1, player2]);

  const score = useMemo(() => {
    if (!compareStats) return { player1: 0, player2: 0 };
    return compareStats.reduce(
      (acc, stat) => ({
        player1: acc.player1 + (stat.winner === 1 ? 1 : 0),
        player2: acc.player2 + (stat.winner === 2 ? 1 : 0),
      }),
      { player1: 0, player2: 0 }
    );
  }, [compareStats]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-accent-blue" />
          <h1 className="text-2xl font-bold text-foreground">Comparar Jogadores</h1>
        </div>

        {/* Seletores de jogadores */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Jogador 1 */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
            <h3 className="text-sm font-medium text-muted mb-3">Jogador 1</h3>
            {player1 ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${getAvatarColor(player1.nome)}`}
                  >
                    {player1.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{player1.nome}</p>
                    <p className="text-xs text-muted">{player1.jogos} jogos</p>
                  </div>
                </div>
                <button
                  onClick={() => setPlayer1(null)}
                  className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
                <input
                  type="text"
                  placeholder="Buscar jogador..."
                  value={search1}
                  onChange={(e) => setSearch1(e.target.value)}
                  onFocus={() => setShowDropdown1(true)}
                  className="h-10 w-full rounded-lg border border-card-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
                />
                {showDropdown1 && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-card-border bg-card-bg shadow-lg">
                    {filtered1.map((p) => (
                      <button
                        key={p.nome}
                        onClick={() => selectPlayer1(p)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-background transition-colors"
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(p.nome)}`}
                        >
                          {p.nome.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.nome}</p>
                          <p className="text-xs text-muted">{p.gols}G {p.assistencias}A</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Jogador 2 */}
          <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
            <h3 className="text-sm font-medium text-muted mb-3">Jogador 2</h3>
            {player2 ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${getAvatarColor(player2.nome)}`}
                  >
                    {player2.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{player2.nome}</p>
                    <p className="text-xs text-muted">{player2.jogos} jogos</p>
                  </div>
                </div>
                <button
                  onClick={() => setPlayer2(null)}
                  className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
                <input
                  type="text"
                  placeholder="Buscar jogador..."
                  value={search2}
                  onChange={(e) => setSearch2(e.target.value)}
                  onFocus={() => setShowDropdown2(true)}
                  className="h-10 w-full rounded-lg border border-card-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
                />
                {showDropdown2 && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-card-border bg-card-bg shadow-lg">
                    {filtered2.map((p) => (
                      <button
                        key={p.nome}
                        onClick={() => selectPlayer2(p)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-background transition-colors"
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(p.nome)}`}
                        >
                          {p.nome.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.nome}</p>
                          <p className="text-xs text-muted">{p.gols}G {p.assistencias}A</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Comparativo */}
        <AnimatePresence>
          {player1 && player2 && compareStats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 space-y-6"
            >
              {/* Score */}
              <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-sm">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${getAvatarColor(player1.nome)}`}
                    >
                      {player1.nome.charAt(0)}
                    </div>
                    <p className="mt-2 font-medium text-foreground">{player1.nome}</p>
                    <p className="text-3xl font-bold text-accent-blue">{score.player1}</p>
                  </div>
                  <div className="text-2xl font-bold text-muted">VS</div>
                  <div className="text-center">
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${getAvatarColor(player2.nome)}`}
                    >
                      {player2.nome.charAt(0)}
                    </div>
                    <p className="mt-2 font-medium text-foreground">{player2.nome}</p>
                    <p className="text-3xl font-bold text-accent-green">{score.player2}</p>
                  </div>
                </div>
              </div>

              {/* Tabela comparativa */}
              <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
                <h3 className="text-base font-semibold text-foreground mb-4">Comparativo Detalhado</h3>
                <div className="space-y-3">
                  {compareStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`flex-1 text-right ${stat.winner === 1 ? "font-bold text-accent-blue" : "text-foreground"}`}>
                        {stat.value1}
                        {stat.winner === 1 && <span className="ml-1 text-xs">✓</span>}
                      </div>
                      <div className="w-32 text-center text-xs text-muted bg-background rounded-lg py-2">
                        {stat.label}
                      </div>
                      <div className={`flex-1 text-left ${stat.winner === 2 ? "font-bold text-accent-green" : "text-foreground"}`}>
                        {stat.winner === 2 && <span className="mr-1 text-xs">✓</span>}
                        {stat.value2}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <PlayerRadarChart
                player={player1}
                players={players}
                comparePlayer={player2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {(!player1 || !player2) && (
          <div className="mt-12 text-center text-muted">
            <Users className="mx-auto h-12 w-12 text-muted-light/50" />
            <p className="mt-4">Selecione dois jogadores para comparar suas estatísticas</p>
          </div>
        )}
      </div>
    </div>
  );
}
