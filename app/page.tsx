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
import {
  calculateTrend,
  calculateCardsTrend,
  generateBarsFromMonthly,
  generateCardsBars,
  calculatePerformancePercentage,
  getTopParticipations,
} from "@/src/lib/calculations";
import { Sidebar } from "@/src/components/Sidebar";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { StatsCard } from "@/src/components/StatsCard";
import { TopRankingCard } from "@/src/components/TopRankingCard";
import { TeamOverviewCard } from "@/src/components/TeamOverviewCard";
import { PlayerStatsTable } from "@/src/components/PlayerStatsTable";
import { PerformanceGoalChart } from "@/src/components/PerformanceGoalChart";
import { GoalsReportChart } from "@/src/components/GoalsReportChart";
import { TopParticipationsCard } from "@/src/components/TopParticipationsCard";
import { EvolutionChart } from "@/src/components/EvolutionChart";

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
            Nao foi possivel carregar os dados
          </h2>
          <p className="mt-2 text-sm text-muted">
            Verifique se a planilha esta compartilhada como &quot;qualquer
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
  const cartoesPerJogo = ((totalAmarelos + totalVermelhos) / maxJogos).toFixed(1);

  // Calcular trends reais baseados nos dados mensais
  const golsTrend = calculateTrend(monthlyData, "gols");
  const assistsTrend = calculateTrend(monthlyData, "assistencias");
  const cardsTrend = calculateCardsTrend(totalAmarelos, totalVermelhos, monthlyData);

  // Gerar barras baseadas em dados reais
  const golsBars = generateBarsFromMonthly(monthlyData, "gols");
  const assistsBars = generateBarsFromMonthly(monthlyData, "assistencias");
  const jogosBars = monthlyData.length > 0 
    ? monthlyData.slice(-8).map((_, i) => 3 + (i % 3))
    : [2, 3, 3, 4, 4, 5, 5, 6];
  const cardsBars = generateCardsBars(monthlyData);

  // Calcular porcentagem da meta
  const performancePercentage = calculatePerformancePercentage(totalGols, monthlyData);

  // Calcular trend de jogos
  const expectedGames = (monthlyData.length || 1) * 4;
  const jogosTrendValue = ((maxJogos - expectedGames) / expectedGames * 100).toFixed(0);
  const jogosTrendUp = maxJogos >= expectedGames;

  // Top participacoes
  const topParticipations = getTopParticipations(players, 5);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 pt-20 lg:ml-60 lg:p-6 lg:pt-6">
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-card-border bg-card-bg px-4 py-3 shadow-sm lg:px-5 lg:py-3.5">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="hidden lg:block">
            <ThemeToggle embedded />
          </div>
        </div>

        <div id="inicio" className="scroll-mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:scroll-mt-6">
          <StatsCard
            title="Total de Gols"
            value={String(totalGols)}
            trend={golsTrend.percentage}
            trendUp={golsTrend.isUp}
            subtitle={`${golsPerJogo} gols/jogo`}
            icon={<Goal className="h-5 w-5" />}
            bars={golsBars}
            barColor="#3b82f6"
            tooltip="Variacao em relacao ao mes anterior"
          />
          <StatsCard
            title="Total de Assistencias"
            value={String(totalAssists)}
            trend={assistsTrend.percentage}
            trendUp={assistsTrend.isUp}
            subtitle={`${assistsPerJogo} assist/jogo`}
            icon={<Handshake className="h-5 w-5" />}
            bars={assistsBars}
            barColor="#10b981"
            tooltip="Variacao em relacao ao mes anterior"
          />
          <StatsCard
            title="Jogos Disputados"
            value={String(maxJogos)}
            trend={`${jogosTrendUp ? "+" : ""}${jogosTrendValue}%`}
            trendUp={jogosTrendUp}
            subtitle={`${jogadoresAtivos} jogadores ativos`}
            icon={<Users className="h-5 w-5" />}
            bars={jogosBars}
            barColor="#8b5cf6"
            tooltip="Comparado com media esperada de 4 jogos/mes"
          />
          <StatsCard
            title="Cartoes"
            value={cardsTrend.value}
            trend={cardsTrend.percentage}
            trendUp={cardsTrend.isUp}
            subtitle={`${cartoesPerJogo} cartoes/jogo`}
            icon={<CreditCard className="h-5 w-5" />}
            bars={cardsBars}
            barColor="#f97316"
            tooltip="Menos cartoes que o esperado e positivo"
          />
        </div>

        <div id="tops" className="scroll-mt-20 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:scroll-mt-6">
          <TopRankingCard
            title="Top Artilheiros"
            players={getTopScorers(players, 5)}
            valueKey="gols"
            valueSuffix="gols"
            showMVP
          />
          <TopRankingCard
            title="Top Assistencias"
            players={getTopAssisters(players, 5)}
            valueKey="assistencias"
            valueSuffix="assist"
            showMVP
          />
          <TeamOverviewCard
            totalGols={totalGols}
            totalAssists={totalAssists}
            jogadoresAtivos={jogadoresAtivos}
          />
        </div>

        {/* Nova secao: Top G+A */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopParticipationsCard players={topParticipations} />
          <EvolutionChart data={monthlyData} />
        </div>

        <div id="jogadores" className="scroll-mt-20 mt-6 lg:scroll-mt-6">
          <PlayerStatsTable players={getAllPlayersSorted(players)} />
        </div>

        <div id="graficos" className="scroll-mt-20 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5 lg:scroll-mt-6">
          <div className="lg:col-span-2">
            <PerformanceGoalChart
              percentage={performancePercentage}
              artilheiro={artilheiro}
              garcom={garcom}
              totalGols={totalGols}
              metaAnual={150}
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
