import { DashboardHeader } from "@/src/components/DashboardHeader";
import { GoalsAssistsChart } from "@/src/components/GoalsAssistsChart";
import { YellowCardsChart } from "@/src/components/YellowCardsChart";
import { GoalsChart } from "@/src/components/GoalsChart";
import { GamesTable } from "@/src/components/GamesTable";
import { RedCardsChart } from "@/src/components/RedCardsChart";
import { AssistsChart } from "@/src/components/AssistsChart";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Coluna esquerda: Gols + Assistência (ocupa 2 linhas no desktop) */}
          <div className="lg:row-span-3">
            <GoalsAssistsChart />
          </div>

          {/* Centro-topo: Cartão Amarelo */}
          <div>
            <YellowCardsChart />
          </div>

          {/* Direita-topo: Gols */}
          <div>
            <GoalsChart />
          </div>

          {/* Centro: Tabela de Jogos */}
          <div>
            <GamesTable />
          </div>

          {/* Direita: (espaço vazio no grid, preenchido pelo row-span) */}

          {/* Centro-base: Cartão Vermelho */}
          <div>
            <RedCardsChart />
          </div>

          {/* Direita-base: Assistência */}
          <div>
            <AssistsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
