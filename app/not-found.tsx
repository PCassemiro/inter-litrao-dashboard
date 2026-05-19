import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border border-card-border bg-card-bg p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple/10">
          <FileQuestion className="h-8 w-8 text-accent-purple" />
        </div>
        
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        
        <p className="mt-2 text-sm text-muted">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-blue/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Ir para o Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card-bg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
