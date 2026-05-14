import { players, type Player } from "@/src/constants/mockData";

type PlayerWithGA = Player & { golsAssistencias: number };

export function getGoalsAndAssists(): PlayerWithGA[] {
  return players
    .map((p) => ({ ...p, golsAssistencias: p.gols + p.assistencias }))
    .filter((p) => p.golsAssistencias > 0)
    .sort((a, b) => b.golsAssistencias - a.golsAssistencias);
}

export function getTopScorers() {
  return players
    .filter((p) => p.gols > 0)
    .sort((a, b) => b.gols - a.gols);
}

export function getTopAssisters() {
  return players
    .filter((p) => p.assistencias > 0)
    .sort((a, b) => b.assistencias - a.assistencias);
}

export function getYellowCards() {
  return players
    .filter((p) => p.cartoesAmarelos > 0)
    .sort((a, b) => b.cartoesAmarelos - a.cartoesAmarelos);
}

export function getRedCards() {
  return players
    .filter((p) => p.cartoesVermelhos > 0)
    .sort((a, b) => b.cartoesVermelhos - a.cartoesVermelhos);
}

export function getPlayersByGames() {
  return [...players].sort((a, b) => a.nome.localeCompare(b.nome));
}
