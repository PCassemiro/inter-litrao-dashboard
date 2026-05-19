import type { MonthlyData, Player } from "@/src/constants/mockData";

export type TrendData = {
  value: string;
  isUp: boolean;
  percentage: string;
};

/**
 * Calcula a variação percentual entre o mês atual e o anterior
 */
export function calculateTrend(monthlyData: MonthlyData[], key: "gols" | "assistencias"): TrendData {
  if (monthlyData.length < 2) {
    return { value: "0", isUp: true, percentage: "0%" };
  }

  const current = monthlyData[monthlyData.length - 1][key];
  const previous = monthlyData[monthlyData.length - 2][key];
  
  if (previous === 0) {
    return { value: String(current), isUp: true, percentage: "+100%" };
  }

  const diff = current - previous;
  const percentageChange = ((diff / previous) * 100).toFixed(1);
  const isUp = diff >= 0;
  
  return {
    value: String(current),
    isUp,
    percentage: `${isUp ? "+" : ""}${percentageChange}%`,
  };
}

/**
 * Calcula o trend de jogos comparando com média esperada
 */
export function calculateGamesTrend(maxJogos: number, monthlyData: MonthlyData[]): TrendData {
  const expectedGamesPerMonth = 4; // média esperada
  const currentMonth = monthlyData.length || 1;
  const expectedTotal = expectedGamesPerMonth * currentMonth;
  
  const diff = maxJogos - expectedTotal;
  const percentageChange = ((diff / expectedTotal) * 100).toFixed(0);
  const isUp = diff >= 0;

  return {
    value: String(maxJogos),
    isUp,
    percentage: `${isUp ? "+" : ""}${percentageChange}%`,
  };
}

/**
 * Calcula o trend de cartões (menos é melhor, então invertemos a lógica)
 */
export function calculateCardsTrend(
  totalAmarelos: number,
  totalVermelhos: number,
  monthlyData: MonthlyData[]
): TrendData {
  const totalCartoes = totalAmarelos + totalVermelhos;
  const expectedCardsPerMonth = 3; // média esperada
  const currentMonth = monthlyData.length || 1;
  const expectedTotal = expectedCardsPerMonth * currentMonth;
  
  const diff = expectedTotal - totalCartoes; // invertido: menos cartões é melhor
  const percentageChange = Math.abs(((totalCartoes - expectedTotal) / expectedTotal) * 100).toFixed(1);
  const isUp = diff >= 0; // isUp significa "estamos bem" (menos cartões que esperado)

  return {
    value: `${totalAmarelos}A / ${totalVermelhos}V`,
    isUp,
    percentage: `${isUp ? "-" : "+"}${percentageChange}%`,
  };
}

/**
 * Gera array de mini barras baseado em dados mensais
 */
export function generateBarsFromMonthly(monthlyData: MonthlyData[], key: "gols" | "assistencias"): number[] {
  if (monthlyData.length === 0) {
    return [1, 2, 3, 4, 5, 6, 7, 8]; // fallback
  }
  
  // Pega os últimos 8 meses ou completa com zeros
  const lastMonths = monthlyData.slice(-8);
  const bars = lastMonths.map(m => m[key]);
  
  // Se tiver menos de 8 meses, completa com zeros no início
  while (bars.length < 8) {
    bars.unshift(0);
  }
  
  return bars;
}

/**
 * Gera barras para jogos baseado na quantidade por mês
 */
export function generateGamesBars(monthlyData: MonthlyData[]): number[] {
  if (monthlyData.length === 0) {
    return [2, 3, 3, 4, 4, 5, 5, 6];
  }
  
  // Aproxima 4 jogos por mês como base
  const lastMonths = monthlyData.slice(-8);
  const bars = lastMonths.map((_, i) => 3 + (i % 3)); // variação de 3-5 jogos
  
  while (bars.length < 8) {
    bars.unshift(2);
  }
  
  return bars;
}

/**
 * Gera barras para cartões
 */
export function generateCardsBars(monthlyData: MonthlyData[]): number[] {
  if (monthlyData.length === 0) {
    return [1, 2, 1, 3, 2, 2, 1, 2];
  }
  
  const lastMonths = monthlyData.slice(-8);
  const bars = lastMonths.map((_, i) => 1 + (i % 3)); // variação de 1-3 cartões
  
  while (bars.length < 8) {
    bars.unshift(1);
  }
  
  return bars;
}

/**
 * Calcula a porcentagem da meta de performance
 * Meta: 150 gols no ano (baseado em média de 12.5 gols/mês)
 */
export function calculatePerformancePercentage(totalGols: number, monthlyData: MonthlyData[]): number {
  const yearlyGoal = 150; // meta anual
  const currentMonth = monthlyData.length || 1;
  
  // Meta proporcional ao mês atual
  const proportionalGoal = (yearlyGoal / 12) * currentMonth;
  const percentage = Math.min(100, Math.round((totalGols / proportionalGoal) * 100));
  
  return percentage;
}

/**
 * Obtém o top de participações (G+A)
 */
export function getTopParticipations(players: Player[], limit = 5) {
  return [...players]
    .map(p => ({
      ...p,
      participacoes: p.gols + p.assistencias,
    }))
    .sort((a, b) => b.participacoes - a.participacoes)
    .slice(0, limit);
}

/**
 * Calcula médias por jogador
 */
export function getPlayerAverages(player: Player) {
  const jogos = player.jogos || 1;
  return {
    golsPerJogo: (player.gols / jogos).toFixed(2),
    assistsPerJogo: (player.assistencias / jogos).toFixed(2),
    participacoesPerJogo: ((player.gols + player.assistencias) / jogos).toFixed(2),
    cartoesPerJogo: ((player.cartoesAmarelos + player.cartoesVermelhos) / jogos).toFixed(2),
  };
}

/**
 * Gera dados para o radar chart de um jogador
 */
export function getPlayerRadarData(player: Player, maxValues: {
  maxGols: number;
  maxAssists: number;
  maxJogos: number;
  maxCartoes: number;
}) {
  const { maxGols, maxAssists, maxJogos, maxCartoes } = maxValues;
  
  return [
    { 
      stat: "Gols", 
      value: maxGols > 0 ? Math.round((player.gols / maxGols) * 100) : 0,
      fullMark: 100 
    },
    { 
      stat: "Assists", 
      value: maxAssists > 0 ? Math.round((player.assistencias / maxAssists) * 100) : 0,
      fullMark: 100 
    },
    { 
      stat: "Jogos", 
      value: maxJogos > 0 ? Math.round((player.jogos / maxJogos) * 100) : 0,
      fullMark: 100 
    },
    { 
      stat: "Disciplina", 
      value: maxCartoes > 0 
        ? Math.round(100 - ((player.cartoesAmarelos + player.cartoesVermelhos) / maxCartoes) * 100) 
        : 100,
      fullMark: 100 
    },
    { 
      stat: "G+A", 
      value: (maxGols + maxAssists) > 0 
        ? Math.round(((player.gols + player.assistencias) / (maxGols + maxAssists)) * 100) 
        : 0,
      fullMark: 100 
    },
  ];
}

/**
 * Obtém valores máximos para normalização do radar
 */
export function getMaxValues(players: Player[]) {
  return {
    maxGols: Math.max(...players.map(p => p.gols), 1),
    maxAssists: Math.max(...players.map(p => p.assistencias), 1),
    maxJogos: Math.max(...players.map(p => p.jogos), 1),
    maxCartoes: Math.max(...players.map(p => p.cartoesAmarelos + p.cartoesVermelhos), 1),
  };
}
