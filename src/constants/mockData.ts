export type Posicao = "Goleiro" | "Zagueiro" | "Volante" | "Meia" | "Atacante";

export type Player = {
  nome: string;
  posicao: Posicao;
  gols: number;
  assistencias: number;
  jogos: number;
  cartoesAmarelos: number;
  cartoesVermelhos: number;
};

export const players: Player[] = [
  { nome: "MARQUINHOS", posicao: "Atacante", gols: 30, assistencias: 6, jogos: 12, cartoesAmarelos: 3, cartoesVermelhos: 0 },
  { nome: "DIEGO", posicao: "Meia", gols: 18, assistencias: 4, jogos: 10, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "FELIPE", posicao: "Meia", gols: 15, assistencias: 4, jogos: 11, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "FILIPE DINÁ", posicao: "Atacante", gols: 14, assistencias: 4, jogos: 9, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "JORLAN", posicao: "Meia", gols: 12, assistencias: 2, jogos: 10, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "GABRIEL OLIVEIRA", posicao: "Atacante", gols: 10, assistencias: 3, jogos: 9, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "JP", posicao: "Atacante", gols: 9, assistencias: 3, jogos: 8, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "ROBERT", posicao: "Atacante", gols: 9, assistencias: 2, jogos: 7, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "LUCAS", posicao: "Atacante", gols: 8, assistencias: 2, jogos: 7, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "HEBER", posicao: "Meia", gols: 7, assistencias: 3, jogos: 8, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "CARLINI", posicao: "Meia", gols: 6, assistencias: 3, jogos: 10, cartoesAmarelos: 5, cartoesVermelhos: 0 },
  { nome: "ANDINHO", posicao: "Atacante", gols: 7, assistencias: 1, jogos: 8, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "RAFAEL", posicao: "Atacante", gols: 5, assistencias: 2, jogos: 6, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "MARROCOS", posicao: "Meia", gols: 5, assistencias: 3, jogos: 7, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "PABLO X", posicao: "Atacante", gols: 5, assistencias: 2, jogos: 5, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "ALYSSON", posicao: "Meia", gols: 4, assistencias: 3, jogos: 7, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "DARÉ", posicao: "Atacante", gols: 4, assistencias: 2, jogos: 6, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "MARCOS ANTONIO", posicao: "Volante", gols: 3, assistencias: 3, jogos: 9, cartoesAmarelos: 4, cartoesVermelhos: 1 },
  { nome: "MURILO PINTO", posicao: "Atacante", gols: 4, assistencias: 2, jogos: 6, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "LEO INIESTA", posicao: "Meia", gols: 4, assistencias: 2, jogos: 5, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "TIAGO VINICIUS", posicao: "Meia", gols: 4, assistencias: 1, jogos: 5, cartoesAmarelos: 3, cartoesVermelhos: 0 },
  { nome: "VITOR HUGO", posicao: "Meia", gols: 4, assistencias: 2, jogos: 5, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "ABRAHÃO", posicao: "Meia", gols: 3, assistencias: 1, jogos: 5, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "GUILHERME TIGRESA", posicao: "Meia", gols: 3, assistencias: 3, jogos: 7, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "JUNINHO", posicao: "Volante", gols: 3, assistencias: 2, jogos: 7, cartoesAmarelos: 3, cartoesVermelhos: 1 },
  { nome: "NEILTON", posicao: "Meia", gols: 3, assistencias: 2, jogos: 4, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "PEDRO", posicao: "Atacante", gols: 3, assistencias: 1, jogos: 3, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "RENATO", posicao: "Meia", gols: 3, assistencias: 2, jogos: 6, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "CAIO", posicao: "Meia", gols: 3, assistencias: 1, jogos: 4, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "ALEMÃO", posicao: "Zagueiro", gols: 2, assistencias: 1, jogos: 6, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "GUSTAVO", posicao: "Volante", gols: 2, assistencias: 2, jogos: 8, cartoesAmarelos: 4, cartoesVermelhos: 0 },
  { nome: "LUCIANO", posicao: "Zagueiro", gols: 2, assistencias: 1, jogos: 5, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "SPALLA", posicao: "Zagueiro", gols: 2, assistencias: 8, jogos: 8, cartoesAmarelos: 2, cartoesVermelhos: 1 },
  { nome: "CASEMIRO", posicao: "Volante", gols: 2, assistencias: 1, jogos: 9, cartoesAmarelos: 5, cartoesVermelhos: 0 },
  { nome: "WELLINGTON", posicao: "Volante", gols: 2, assistencias: 1, jogos: 7, cartoesAmarelos: 4, cartoesVermelhos: 0 },
  { nome: "DAMIANI", posicao: "Zagueiro", gols: 1, assistencias: 1, jogos: 3, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "JULIO", posicao: "Zagueiro", gols: 1, assistencias: 1, jogos: 4, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "ANTONIO JR", posicao: "Zagueiro", gols: 1, assistencias: 2, jogos: 4, cartoesAmarelos: 0, cartoesVermelhos: 0 },
  { nome: "MURILO RENATO", posicao: "Zagueiro", gols: 1, assistencias: 2, jogos: 5, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "TIAGO BARCELOS", posicao: "Volante", gols: 1, assistencias: 1, jogos: 6, cartoesAmarelos: 3, cartoesVermelhos: 1 },
  { nome: "THIAGO COSTA", posicao: "Zagueiro", gols: 1, assistencias: 1, jogos: 5, cartoesAmarelos: 2, cartoesVermelhos: 1 },
  { nome: "ANDERSON", posicao: "Zagueiro", gols: 1, assistencias: 2, jogos: 5, cartoesAmarelos: 2, cartoesVermelhos: 0 },
  { nome: "WERVELTON", posicao: "Volante", gols: 2, assistencias: 1, jogos: 6, cartoesAmarelos: 3, cartoesVermelhos: 1 },
  { nome: "CEZAR", posicao: "Goleiro", gols: 0, assistencias: 0, jogos: 7, cartoesAmarelos: 1, cartoesVermelhos: 0 },
  { nome: "BRUNO", posicao: "Goleiro", gols: 0, assistencias: 0, jogos: 8, cartoesAmarelos: 1, cartoesVermelhos: 0 },
];

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
