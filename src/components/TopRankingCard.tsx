import type { Player } from "@/src/constants/mockData";

type TopRankingCardProps = {
  title: string;
  players: Player[];
  valueKey: "gols" | "assistencias";
  valueSuffix: string;
};

const medalColors: Record<number, { bg: string; text: string }> = {
  0: { bg: "bg-amber-100 text-amber-700", text: "text-amber-600" },
  1: { bg: "bg-gray-100 text-gray-500", text: "text-gray-500" },
  2: { bg: "bg-orange-100 text-orange-700", text: "text-orange-600" },
};

export function TopRankingCard({
  title,
  players,
  valueKey,
  valueSuffix,
}: TopRankingCardProps) {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-4 space-y-3">
        {players.map((player, index) => {
          const medal = medalColors[index];
          return (
            <div key={player.nome} className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  medal?.bg ?? "bg-gray-50 text-gray-400"
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {player.nome}
                </p>
                <p className="text-xs text-muted">{player.posicao}</p>
              </div>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {player[valueKey]} {valueSuffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
