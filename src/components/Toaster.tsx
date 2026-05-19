"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          color: "var(--foreground)",
        },
        className: "!bg-card-bg !border-card-border !text-foreground",
      }}
      richColors
    />
  );
}
