import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/src/components/Toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inter de Litrao 2026 - Dashboard",
    template: "%s | Inter de Litrao 2026",
  },
  description: "Dashboard de estatisticas do Inter de Litrao 2026 - Acompanhe gols, assistencias e desempenho dos jogadores",
  keywords: ["futebol", "estatisticas", "inter de litrao", "dashboard", "gols", "assistencias"],
  authors: [{ name: "Inter de Litrao" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://inter-litrao-dashboard.vercel.app",
    siteName: "Inter de Litrao 2026",
    title: "Inter de Litrao 2026 - Dashboard",
    description: "Dashboard de estatisticas do Inter de Litrao 2026",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inter de Litrao 2026 Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inter de Litrao 2026 - Dashboard",
    description: "Dashboard de estatisticas do Inter de Litrao 2026",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebebeb" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
