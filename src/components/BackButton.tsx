"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card-bg transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </button>
  );
}
