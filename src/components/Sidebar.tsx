"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Trophy,
  Users,
  ChartBar,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  GitCompare,
} from "lucide-react";
import { ThemeToggle } from "@/src/components/ThemeToggle";

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  isAnchor?: boolean;
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
      { label: "Inicio", icon: LayoutDashboard, href: "/#inicio", isAnchor: true },
      { label: "Tops", icon: Trophy, href: "/#tops", isAnchor: true },
    ],
  },
  {
    title: "ESTATISTICAS",
    defaultOpen: true,
    items: [
      { label: "Jogadores", icon: Users, href: "/#jogadores", isAnchor: true },
      { label: "Graficos", icon: ChartBar, href: "/#graficos", isAnchor: true },
      { label: "Comparar", icon: GitCompare, href: "/comparar", isAnchor: false },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(navSections.map((s) => [s.title, s.defaultOpen])),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("/#inicio");

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
    // Se nao estiver na home, nao observar sections
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }

    const sectionIds = navSections
      .flatMap((s) => s.items)
      .filter((i) => i.isAnchor && i.href.startsWith("/#"))
      .map((h) => h.href.slice(2));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHref(`/#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const toggle = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    setMobileOpen(false);
    
    if (!item.isAnchor) {
      // Link normal, deixa o Next.js navegar
      return;
    }

    // Anchor link
    e.preventDefault();
    const id = item.href.slice(2); // Remove "/#"
    
    if (pathname !== "/") {
      // Se nao estiver na home, navega primeiro
      window.location.href = item.href;
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHref(item.href);
  };

  const isActive = (item: NavItem) => {
    if (item.isAnchor) {
      return pathname === "/" && activeHref === item.href;
    }
    return pathname === item.href;
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-active font-bold text-white text-sm">
            IL
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              Inter de Litrao
            </p>
            <p className="text-xs text-sidebar-text">2026</p>
          </div>
        </Link>
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
                  const active = isActive(item);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-sidebar-active text-white font-medium"
                            : "text-sidebar-text hover:bg-sidebar-active/40 hover:text-white"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Header mobile com fundo - so aparece em telas < lg */}
      <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-card-border bg-card-bg/95 px-4 shadow-sm backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-bg text-xs font-bold text-white">
            IL
          </div>
          <span className="text-sm font-semibold text-foreground">
            Inter de Litrao
          </span>
        </Link>
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

      {/* Overlay mobile - so renderiza quando aberto para nao interferir no header */}
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

      {/* Sidebar desktop - sempre visivel em lg+ */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 flex-col bg-sidebar-bg text-sidebar-text lg:flex">
        {sidebarContent}
      </aside>
    </>
  );
}
