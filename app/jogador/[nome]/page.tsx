import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Goal, Handshake, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { fetchPlayersFromSheet } from "@/src/lib/sheets";
import { getPlayerAverages, getMaxValues } from "@/src/lib/calculations";
import { PlayerRadarChart } from "@/src/components/PlayerRadarChart";

export const revalidate = 60;

type Props = {
  params: Promise<{ nome: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { nome } = await params;
  const decodedName = decodeURIComponent(nome);
  return {
    title: `${decodedName} - Inter de Litrao 2026`,
    description: `Estatisticas de ${decodedName} no Inter de Litrao 2026`,
  };
}

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

export default async function PlayerPage({ params }: Props) {
  const { nome } = await params;
  const decodedName = decodeURIComponent(nome);
  const players = await fetchPlayersFromSheet();

  const player = players.find(
    (p) => p.nome.toLowerCase() === decodedName.toLowerCase()
  );

  if (!player) {
    notFound();
  }

  const averages = getPlayerAverages(player);
  const maxValues = getMaxValues(players);

  // Calcular posicao nos rankings
  const sortedByGols = [...players].sort((a, b) => b.gols - a.gols);
  const sortedByAssists = [...players].sort((a, b) => b.assistencias - a.assistencias);
  const sortedByGA = [...players].sort((a, b) => (b.gols + b.assistencias) - (a.gols + a.assistencias));

  const rankGols = sortedByGols.findIndex((p) => p.nome === player.nome) + 1;
  const rankAssists = sortedByAssists.findIndex((p) => p.nome === player.nome) + 1;
  const rankGA = sortedByGA.findIndex((p) => p.nome === player.nome) + 1;

  const stats = [
    {
      icon: Goal,
      label: "Gols",
      value: player.gols,
      average: `${averages.golsPerJogo}/jogo`,
      rank: rankGols,
      color: "text-accent-blue",
      bgColor: "bg-accent-blue/10",
    },
    {
      icon: Handshake,
      label: "Assistencias",
      value: player.assistencias,
      average: `${averages.assistsPerJogo}/jogo`,
      rank: rankAssists,
      color: "text-accent-green",
      bgColor: "bg-accent-green/10",
    },
    {
      icon: Calendar,
      label: "Jogos",
      value: player.jogos,
      average: `${((player.jogos / maxValues.maxJogos) * 100).toFixed(0)}% presenca`,
      rank: null,
      color: "text-accent-purple",
      bgColor: "bg-accent-purple/10",
    },
    {
      icon: TrendingUp,
      label: "Participacoes (G+A)",
      value: player.gols + player.assistencias,
      average: `${averages.participacoesPerJogo}/jogo`,
      rank: rankGA,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Link>

        {/* Header do jogador */}
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-3xl font-bold ${getAvatarColor(player.nome)}`}
            >
              {player.nome.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{player.nome}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>{player.jogos} jogos disputados</span>
                {rankGA <= 3 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                    Top {rankGA} em participacoes
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {player.cartoesAmarelos > 0 && (
                <div className="flex items-center gap-1 rounded-lg bg-accent-yellow/10 px-3 py-2">
                  <span className="inline-block h-5 w-4 rounded-sm bg-accent-yellow" />
                  <span className="text-sm font-medium text-foreground">
                    {player.cartoesAmarelos}
                  </span>
                </div>
              )}
              {player.cartoesVermelhos > 0 && (
                <div className="flex items-center gap-1 rounded-lg bg-accent-red/10 px-3 py-2">
                  <span className="inline-block h-5 w-4 rounded-sm bg-accent-red" />
                  <span className="text-sm font-medium text-foreground">
                    {player.cartoesVermelhos}
                  </span>
                </div>
              )}
              {player.cartoesAmarelos === 0 && player.cartoesVermelhos === 0 && (
                <div className="flex items-center gap-1 rounded-lg bg-accent-green/10 px-3 py-2">
                  <CreditCard className="h-4 w-4 text-accent-green" />
                  <span className="text-sm font-medium text-accent-green">
                    Sem cartoes
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-card-border bg-card-bg p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-2 ${stat.bgColor} ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                {stat.rank && (
                  <span className="ml-2 text-xs text-muted">
                    #{stat.rank} no ranking
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-light">{stat.average}</p>
            </div>
          ))}
        </div>

        {/* Radar Chart */}
        <div className="mt-6">
          <PlayerRadarChart player={player} players={players} />
        </div>

        {/* Medias detalhadas */}
        <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
          <h3 className="text-base font-semibold text-foreground">Medias por Jogo</h3>
          <p className="text-xs text-muted">Desempenho medio em {player.jogos} jogos</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-background p-4">
              <p className="text-2xl font-bold text-accent-blue">{averages.golsPerJogo}</p>
              <p className="text-xs text-muted">Gols/Jogo</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-2xl font-bold text-accent-green">{averages.assistsPerJogo}</p>
              <p className="text-xs text-muted">Assists/Jogo</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-2xl font-bold text-gold">{averages.participacoesPerJogo}</p>
              <p className="text-xs text-muted">G+A/Jogo</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-2xl font-bold text-accent-orange">{averages.cartoesPerJogo}</p>
              <p className="text-xs text-muted">Cartoes/Jogo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
