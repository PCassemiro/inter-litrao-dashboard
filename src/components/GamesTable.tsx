"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPlayersByGames } from "@/src/hooks/usePlayerStats";

const PAGE_SIZE = 10;

export function GamesTable() {
  const data = getPlayersByGames();
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const slice = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="rounded-lg border border-card-border bg-card-bg p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Jogos Disputados
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border text-left text-xs uppercase text-muted">
              <th className="pb-2 pr-4 font-medium">Atleta</th>
              <th className="pb-2 text-right font-medium">Jogos</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((p) => (
              <tr
                key={p.nome}
                className="border-b border-card-border/50 last:border-0"
              >
                <td className="py-2 pr-4 text-foreground">{p.nome}</td>
                <td className="py-2 text-right tabular-nums text-emerald-light font-medium">
                  {p.jogos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>
          {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, data.length)} de{" "}
          {data.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded p-1 hover:bg-card-border disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-6 w-6 rounded text-xs ${
                i === page
                  ? "bg-emerald text-white"
                  : "hover:bg-card-border"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="rounded p-1 hover:bg-card-border disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
