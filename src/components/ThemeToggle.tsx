"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle({
  className = "",
  embedded = false,
}: {
  className?: string;
  /** Usar dentro de uma barra (menos “cartão flutuante”) */
  embedded?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial: Theme = stored ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
      className={
        embedded
          ? `inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background text-foreground transition-colors hover:bg-card-border/40 ${className}`
          : `inline-flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card-bg text-foreground transition-colors hover:bg-background ${className}`
      }
    >
      {mounted && theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
