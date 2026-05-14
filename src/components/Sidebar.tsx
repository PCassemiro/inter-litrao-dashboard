"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Target,
  Handshake,
  Users,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Settings,
  User,
} from "lucide-react";

const navSections = [
  {
    title: "DASHBOARD",
    defaultOpen: true,
    items: [
      { label: "Visão Geral", icon: LayoutDashboard, active: true },
      { label: "Artilharia", icon: Target },
      { label: "Assistências", icon: Handshake },
    ],
  },
  {
    title: "ESTATÍSTICAS",
    defaultOpen: true,
    items: [
      { label: "Jogadores", icon: Users },
      { label: "Cartões", icon: CreditCard },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    defaultOpen: false,
    items: [
      { label: "Configurações", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(navSections.map((s) => [s.title, s.defaultOpen]))
  );

  const toggle = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-60 flex-col bg-sidebar-bg text-sidebar-text">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-active font-bold text-white text-sm">
          IL
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">Inter de Litrão</p>
          <p className="text-xs text-sidebar-text">2026</p>
        </div>
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
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        item.active
                          ? "bg-sidebar-active text-white font-medium"
                          : "text-sidebar-text hover:bg-sidebar-active/40 hover:text-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-active text-xs font-medium text-white">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-sidebar-text/60">admin@interdelitrao.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
