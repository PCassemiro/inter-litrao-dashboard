export type Player = {
  nome: string;
  gols: number;
  assistencias: number;
  jogos: number;
  cartoesAmarelos: number;
  cartoesVermelhos: number;
};

export type MonthlyData = {
  mes: string;
  gols: number;
  assistencias: number;
};

export const monthlyData: MonthlyData[] = [
  { mes: "Jan", gols: 12, assistencias: 5 },
  { mes: "Fev", gols: 15, assistencias: 6 },
  { mes: "Mar", gols: 18, assistencias: 8 },
  { mes: "Abr", gols: 22, assistencias: 9 },
  { mes: "Mai", gols: 25, assistencias: 10 },
  { mes: "Jun", gols: 30, assistencias: 11 },
  { mes: "Jul", gols: 38, assistencias: 13 },
  { mes: "Ago", gols: 48, assistencias: 16 },
  { mes: "Set", gols: 62, assistencias: 20 },
  { mes: "Out", gols: 78, assistencias: 25 },
  { mes: "Nov", gols: 90, assistencias: 30 },
  { mes: "Dez", gols: 100, assistencias: 35 },
];
