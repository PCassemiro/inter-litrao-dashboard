"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  ChartBar,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/src/components/ThemeToggle";

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  href?: string;
};

type NavSection = {
  title: string;
  defaultOpen: boolean;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "DASHBOARD",
    defaultOpen: true,
    items: [
      { label: "Início", icon: LayoutDashboard, href: "#inicio" },
      { label: "Tops", icon: Trophy, href: "#tops" },
    ],
  },
  {
    title: "ESTATÍSTICAS",
    defaultOpen: true,
    items: [
      { label: "Jogadores", icon: Users, href: "#jogadores" },
      { label: "Gráficos", icon: ChartBar, href: "#graficos" },
    ],
  },
  // {
  //   title: "CONFIGURAÇÕES",
  //   defaultOpen: false,
  //   items: [{ label: "Configurações", icon: Settings }],
  // },
];

export function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(navSections.map((s) => [s.title, s.defaultOpen])),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#inicio");

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sectionIds = navSections
      .flatMap((s) => s.items)
      .map((i) => i.href)
      .filter((h): h is string => Boolean(h))
      .map((h) => h.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggle = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string | undefined,
  ) => {
    setMobileOpen(false);
    if (!href) return;
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHref(href);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-active font-bold text-white text-sm">
            IL
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              Inter de Litrão
            </p>
            <p className="text-xs text-sidebar-text">2026</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-text hover:bg-sidebar-active/40 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        {navSections.map((section) => (
          <div key={section.title} className="mb-2">
            <button
              onClick={() => toggle(section.title)}
              className="flex w-full items-center justify-between px-2 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-text/60 hover:text-sidebar-text"
            >
              {section.title}
              {openSections[section.title] ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
            {openSections[section.title] && (
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.href === activeHref;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href ?? "#"}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-sidebar-active text-white font-medium"
                            : "text-sidebar-text hover:bg-sidebar-active/40 hover:text-white"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-active text-xs font-medium text-white">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-sidebar-text/60">admin@interdelitrao.com</p>
          </div>
        </div>
      </div> */}
    </>
  );

  return (
    <>
      {/* Header mobile com fundo - só aparece em telas < lg */}
      <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-card-border bg-card-bg/95 px-4 shadow-sm backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-bg text-xs font-bold text-white">
            IL
          </div>
          <span className="text-sm font-semibold text-foreground">
            Inter de Litrão
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle embedded />
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-background"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Overlay mobile - só renderiza quando aberto para não interferir no header */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar mobile (drawer) */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-sidebar-bg text-sidebar-text transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar desktop - sempre visível em lg+ */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 flex-col bg-sidebar-bg text-sidebar-text lg:flex">
        {sidebarContent}
      </aside>
    </>
  );
}
