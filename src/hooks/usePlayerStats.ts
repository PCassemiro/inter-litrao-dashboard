import type { Player } from "@/src/constants/mockData";

export function getTopScorers(players: Player[], limit = 5) {
  return [...players]
    .sort((a, b) => b.gols - a.gols)
    .slice(0, limit);
}

export function getTopAssisters(players: Player[], limit = 5) {
  return [...players]
    .sort((a, b) => b.assistencias - a.assistencias)
    .slice(0, limit);
}

export function getAllPlayersSorted(players: Player[]) {
  return [...players]
    .sort((a, b) => (b.gols + b.assistencias) - (a.gols + a.assistencias));
}

export function getTotalGols(players: Player[]) {
  return players.reduce((sum, p) => sum + p.gols, 0);
}

export function getTotalAssistencias(players: Player[]) {
  return players.reduce((sum, p) => sum + p.assistencias, 0);
}

export function getTotalAmarelos(players: Player[]) {
  return players.reduce((sum, p) => sum + p.cartoesAmarelos, 0);
}

export function getTotalVermelhos(players: Player[]) {
  return players.reduce((sum, p) => sum + p.cartoesVermelhos, 0);
}

export function getJogadoresAtivos(players: Player[]) {
  return players.length;
}

export function getMaxJogos(players: Player[]) {
  return Math.max(...players.map((p) => p.jogos), 1);
}

export function getArtilheiro(players: Player[]) {
  return [...players].sort((a, b) => b.gols - a.gols)[0];
}

export function getGarcom(players: Player[]) {
  return [...players].sort((a, b) => b.assistencias - a.assistencias)[0];
}
