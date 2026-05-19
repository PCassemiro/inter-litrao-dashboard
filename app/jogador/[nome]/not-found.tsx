import Link from "next/link";
import { UserX, Home, ArrowLeft } from "lucide-react";

export default function JogadorNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border border-card-border bg-card-bg p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-orange/10">
          <UserX className="h-8 w-8 text-accent-orange" />
        </div>
        
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Jogador nao encontrado
        </h2>
        
        <p className="mt-2 text-sm text-muted">
          O jogador que voce esta procurando nao existe no elenco ou o nome foi digitado incorretamente.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-blue/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Ver todos os jogadores
          </Link>
          <Link
            href="/#jogadores"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card-bg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Lista de jogadores
          </Link>
        </div>
      </div>
    </div>
  );
}
