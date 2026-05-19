import { fetchPlayersFromSheet } from "@/src/lib/sheets";
import { PlayerCompareClient } from "@/src/components/PlayerCompareClient";

export const revalidate = 60;

export const metadata = {
  title: "Comparar Jogadores - Inter de Litrao 2026",
  description: "Compare estatisticas de jogadores do Inter de Litrao 2026",
};

export default async function ComparePage() {
  const players = await fetchPlayersFromSheet();

  return <PlayerCompareClient players={players} />;
}
