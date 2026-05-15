"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { Player } from "@/src/constants/mockData";

type SortKey = "nome" | "jogos" | "gols" | "assistencias" | "ga" | "cartoes";
type SortDir = "asc" | "desc" | null;

const avatarColors: Record<string, string> = {
  A: "bg-rose-100 text-rose-700",
  B: "bg-sky-100 text-sky-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  E: "bg-lime-100 text-lime-700",
  F: "bg-blue-100 text-blue-700",
  G: "bg-emerald-100 text-emerald-700",
  H: "bg-violet-100 text-violet-700",
  I: "bg-pink-100 text-pink-700",
  J: "bg-teal-100 text-teal-700",
  K: "bg-cyan-100 text-cyan-700",
  L: "bg-indigo-100 text-indigo-700",
  M: "bg-purple-100 text-purple-700",
  N: "bg-fuchsia-100 text-fuchsia-700",
  P: "bg-red-100 text-red-700",
  R: "bg-green-100 text-green-700",
  S: "bg-yellow-100 text-yellow-700",
  T: "bg-slate-200 text-slate-700",
  V: "bg-zinc-200 text-zinc-700",
  W: "bg-stone-200 text-stone-700",
};

function getAvatarColor(name: string) {
  const initial = name.charAt(0);
  return avatarColors[initial] ?? "bg-gray-100 text-gray-700";
}

function getPageNumbers(
  current: number,
  total: number,
  maxButtons: number,
): (number | "...")[] {
  if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i);

  const pages: (number | "...")[] = [0];
  const middleSize = maxButtons - 2;
  const half = Math.floor(middleSize / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total - 2, start + middleSize - 1);

  if (current <= half + 1) {
    start = 1;
    end = middleSize;
  } else if (current >= total - half - 1) {
    start = total - middleSize - 1;
    end = total - 2;
  }

  if (start > 1) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 2) pages.push("...");

  pages.push(total - 1);
  return pages;
}

function useIsMobile(breakpoint = 640): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

type PlayerStatsTableProps = {
  players: Player[];
};

export function PlayerStatsTable({ players }: PlayerStatsTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const isMobile = useIsMobile();
  const maxPageButtons = isMobile ? 3 : 5;

  const hasActiveSort = sortKey !== null && sortDir !== null;

  const goToPage = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => {
      document
        .getElementById("jogadores")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSort = (key: SortKey) => {
    setPage(0);
    if (sortKey === key) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const clearAllFilters = () => {
    setSortKey(null);
    setSortDir(null);
    setSearch("");
    setPage(0);
  };

  const filtered = useMemo(() => {
    const result = players.filter((p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortKey && sortDir) {
      result.sort((a, b) => {
        let va: number | string, vb: number | string;
        switch (sortKey) {
          case "nome":
            va = a.nome;
            vb = b.nome;
            return sortDir === "asc"
              ? va.localeCompare(vb)
              : vb.localeCompare(va);
          case "jogos":
            va = a.jogos;
            vb = b.jogos;
            break;
          case "gols":
            va = a.gols;
            vb = b.gols;
            break;
          case "assistencias":
            va = a.assistencias;
            vb = b.assistencias;
            break;
          case "ga":
            va = a.gols + a.assistencias;
            vb = b.gols + b.assistencias;
            break;
          case "cartoes":
            va = a.cartoesAmarelos + a.cartoesVermelhos;
            vb = b.cartoesAmarelos + b.cartoesVermelhos;
            break;
          default:
            return 0;
        }
        return sortDir === "asc"
          ? (va as number) - (vb as number)
          : (vb as number) - (va as number);
      });
    }

    return result;
  }, [players, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);

  const headers: { key: SortKey; label: string; hideOnMobile?: boolean }[] = [
    { key: "nome", label: "Jogador" },
    { key: "jogos", label: "Jogos", hideOnMobile: true },
    { key: "gols", label: "Gols" },
    { key: "assistencias", label: "Assist" },
    { key: "ga", label: "G+A" },
    { key: "cartoes", label: "Cartões", hideOnMobile: true },
  ];

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Estatísticas dos Jogadores
          </h3>
          <p className="text-xs text-muted">
            {filtered.length} jogadores encontrados
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(hasActiveSort || search) && (
            <button
              onClick={clearAllFilters}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-accent-red/30 bg-accent-red/10 px-3 text-xs font-medium text-accent-red hover:bg-accent-red/20 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Limpar filtros
            </button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
            <input
              type="text"
              placeholder="Buscar jogador..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="h-9 w-full rounded-lg border border-card-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent-blue/30 sm:w-56"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border">
              <th className="hidden w-10 pb-3 text-left text-xs font-medium text-muted sm:table-cell">
                #
              </th>
              {headers.map((h) => {
                const isActive = sortKey === h.key && sortDir !== null;
                const SortIcon = isActive
                  ? sortDir === "asc"
                    ? ArrowUp
                    : ArrowDown
                  : ArrowUpDown;
                return (
                  <th
                    key={h.key}
                    className={`pb-3 text-left text-xs font-medium text-muted ${h.hideOnMobile ? "hidden sm:table-cell" : ""}`}
                  >
                    <button
                      onClick={() => handleSort(h.key)}
                      className={`inline-flex items-center gap-1 transition-colors hover:text-foreground ${isActive ? "text-accent-blue" : ""}`}
                    >
                      {h.label}
                      <SortIcon
                        className={`h-3 w-3 ${isActive ? "text-accent-blue" : ""}`}
                      />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.map((player, index) => (
              <tr
                key={player.nome}
                className="border-b border-card-border/50 last:border-0 hover:bg-background/60"
              >
                <td className="hidden py-3 text-xs text-muted sm:table-cell">
                  {page * perPage + index + 1}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(player.nome)}`}
                    >
                      {player.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {player.nome}
                      </p>
                      <p className="text-xs text-muted">{player.jogos} jogos</p>
                    </div>
                  </div>
                </td>
                <td className="hidden py-3 tabular-nums text-foreground sm:table-cell">
                  {player.jogos}
                </td>
                <td className="py-3 tabular-nums font-medium text-foreground">
                  {player.gols}
                </td>
                <td className="py-3 tabular-nums text-foreground">
                  {player.assistencias}
                </td>
                <td className="py-3 tabular-nums font-semibold text-foreground">
                  {player.gols + player.assistencias}
                </td>
                <td className="hidden py-3 sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    {player.cartoesAmarelos > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-xs">
                        <span className="inline-block h-4 w-3 rounded-sm bg-accent-yellow" />
                        <span className="text-muted">
                          {player.cartoesAmarelos}
                        </span>
                      </span>
                    )}
                    {player.cartoesVermelhos > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-xs">
                        <span className="inline-block h-4 w-3 rounded-sm bg-accent-red" />
                        <span className="text-muted">
                          {player.cartoesVermelhos}
                        </span>
                      </span>
                    )}
                    {player.cartoesAmarelos === 0 &&
                      player.cartoesVermelhos === 0 && (
                        <span className="text-xs text-muted-light">—</span>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center gap-3 border-t border-card-border pt-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            {page * perPage + 1}–
            {Math.min((page + 1) * perPage, filtered.length)} de{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goToPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-card-border text-muted hover:bg-background/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {getPageNumbers(page, totalPages, maxPageButtons).map((item, idx) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="inline-flex h-8 w-6 items-center justify-center text-xs text-muted"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={item}
                  onClick={() => goToPage(item as number)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium ${
                    item === page
                      ? "bg-accent-blue text-white"
                      : "border border-card-border text-muted hover:bg-background/60"
                  }`}
                >
                  {(item as number) + 1}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-card-border text-muted hover:bg-background/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
