import { players } from "@/src/constants/mockData";

export function getTopScorers(limit = 5) {
  return [...players]
    .sort((a, b) => b.gols - a.gols)
    .slice(0, limit);
}

export function getTopAssisters(limit = 5) {
  return [...players]
    .sort((a, b) => b.assistencias - a.assistencias)
    .slice(0, limit);
}

export function getAllPlayersSorted() {
  return [...players]
    .sort((a, b) => (b.gols + b.assistencias) - (a.gols + a.assistencias));
}

export function getTotalGols() {
  return players.reduce((sum, p) => sum + p.gols, 0);
}

export function getTotalAssistencias() {
  return players.reduce((sum, p) => sum + p.assistencias, 0);
}

export function getTotalAmarelos() {
  return players.reduce((sum, p) => sum + p.cartoesAmarelos, 0);
}

export function getTotalVermelhos() {
  return players.reduce((sum, p) => sum + p.cartoesVermelhos, 0);
}

export function getJogadoresAtivos() {
  return players.length;
}

export function getMaxJogos() {
  return Math.max(...players.map((p) => p.jogos));
}

export function getArtilheiro() {
  return [...players].sort((a, b) => b.gols - a.gols)[0];
}

export function getGarcom() {
  return [...players].sort((a, b) => b.assistencias - a.assistencias)[0];
}
