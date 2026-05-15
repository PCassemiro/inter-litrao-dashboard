import { Goal, Handshake, Users, CreditCard } from "lucide-react";
import { fetchPlayersFromSheet, fetchMonthlyData } from "@/src/lib/sheets";
import {
  getTopScorers,
  getTopAssisters,
  getAllPlayersSorted,
  getTotalGols,
  getTotalAssistencias,
  getTotalAmarelos,
  getTotalVermelhos,
  getJogadoresAtivos,
  getMaxJogos,
  getArtilheiro,
  getGarcom,
} from "@/src/hooks/usePlayerStats";
import { Sidebar } from "@/src/components/Sidebar";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { StatsCard } from "@/src/components/StatsCard";
import { TopRankingCard } from "@/src/components/TopRankingCard";
import { TeamOverviewCard } from "@/src/components/TeamOverviewCard";
import { PlayerStatsTable } from "@/src/components/PlayerStatsTable";
import { PerformanceGoalChart } from "@/src/components/PerformanceGoalChart";
import { GoalsReportChart } from "@/src/components/GoalsReportChart";

export const revalidate = 60;

export default async function Home() {
  const [players, monthlyData] = await Promise.all([
    fetchPlayersFromSheet(),
    fetchMonthlyData(),
  ]);

  if (players.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border border-card-border bg-card-bg p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Não foi possível carregar os dados
          </h2>
          <p className="mt-2 text-sm text-muted">
            Verifique se a planilha está compartilhada como &quot;qualquer
            pessoa com o link&quot;.
          </p>
        </div>
      </div>
    );
  }

  const totalGols = getTotalGols(players);
  const totalAssists = getTotalAssistencias(players);
  const totalAmarelos = getTotalAmarelos(players);
  const totalVermelhos = getTotalVermelhos(players);
  const jogadoresAtivos = getJogadoresAtivos(players);
  const maxJogos = getMaxJogos(players);
  const artilheiro = getArtilheiro(players);
  const garcom = getGarcom(players);

  const golsPerJogo = (totalGols / maxJogos).toFixed(1);
  const assistsPerJogo = (totalAssists / maxJogos).toFixed(1);
  const cartoesPerJogo = ((totalAmarelos + totalVermelhos) / maxJogos).toFixed(
    1,
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 pt-20 lg:ml-60 lg:p-6 lg:pt-6">
        <div className="hidden lg:fixed lg:right-6 lg:top-6 lg:z-30 lg:block">
          <ThemeToggle />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted">Home / Dashboard / Visão Geral</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total de Gols"
            value={String(totalGols)}
            trend="+12.5%"
            trendUp
            subtitle={`${golsPerJogo} gols/jogo`}
            icon={<Goal className="h-5 w-5" />}
            bars={[4, 6, 5, 8, 7, 10, 9, 12]}
            barColor="#3b82f6"
          />
          <StatsCard
            title="Total de Assistências"
            value={String(totalAssists)}
            trend="+8.2%"
            trendUp
            subtitle={`${assistsPerJogo} assist/jogo`}
            icon={<Handshake className="h-5 w-5" />}
            bars={[3, 4, 5, 6, 5, 7, 8, 9]}
            barColor="#10b981"
          />
          <StatsCard
            title="Jogos Disputados"
            value={String(maxJogos)}
            trend="-5%"
            trendUp={false}
            subtitle={`${jogadoresAtivos} jogadores ativos`}
            icon={<Users className="h-5 w-5" />}
            bars={[2, 3, 3, 4, 5, 5, 6, 6]}
            barColor="#8b5cf6"
          />
          <StatsCard
            title="Cartões"
            value={`${totalAmarelos}A / ${totalVermelhos}V`}
            trend="-3.2%"
            trendUp={false}
            subtitle={`${cartoesPerJogo} cartões/jogo`}
            icon={<CreditCard className="h-5 w-5" />}
            bars={[5, 7, 4, 8, 6, 9, 7, 5]}
            barColor="#f97316"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TopRankingCard
            title="Top Artilheiros"
            players={getTopScorers(players, 5)}
            valueKey="gols"
            valueSuffix="gols"
          />
          <TopRankingCard
            title="Top Assistências"
            players={getTopAssisters(players, 5)}
            valueKey="assistencias"
            valueSuffix="assist"
          />
          <TeamOverviewCard
            totalGols={totalGols}
            totalAssists={totalAssists}
            jogadoresAtivos={jogadoresAtivos}
          />
        </div>

        <div className="mt-6">
          <PlayerStatsTable players={getAllPlayersSorted(players)} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <PerformanceGoalChart
              percentage={60}
              artilheiro={artilheiro}
              garcom={garcom}
            />
          </div>
          <div className="lg:col-span-3">
            <GoalsReportChart data={monthlyData} />
          </div>
        </div>
      </main>
    </div>
  );
}
