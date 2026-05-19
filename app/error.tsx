"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border border-card-border bg-card-bg p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-red/10">
          <AlertTriangle className="h-8 w-8 text-accent-red" />
        </div>
        
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Algo deu errado
        </h2>
        
        <p className="mt-2 text-sm text-muted">
          Ocorreu um erro ao carregar o dashboard. Isso pode ser um problema temporário com a conexão ou com os dados.
        </p>

        {error.digest && (
          <p className="mt-2 text-xs text-muted-light font-mono">
            Código: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-blue/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card-bg transition-colors"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
