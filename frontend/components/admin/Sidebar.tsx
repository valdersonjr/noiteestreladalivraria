"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { strings } from "@/lib/strings";
import { useAuth } from "@/hooks/useAuth";

const { nav } = strings.admin;

const links = [
  { href: "/admin", label: nav.dashboard, exact: true },
  { href: "/admin/livros", label: nav.livros, exact: false },
  { href: "/admin/pessoas", label: nav.pessoas, exact: false },
  { href: "/admin/vendas", label: nav.vendas, exact: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-surface border-r border-border">
      <div className="px-6 py-5 border-b border-border">
        <span className="font-bold text-foreground text-lg">{strings.site.name}</span>
        <p className="text-xs text-muted mt-0.5">Painel Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={[
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive(href, exact)
                ? "bg-primary-600 text-on-primary"
                : "text-foreground hover:bg-border",
            ].join(" ")}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm text-foreground hover:bg-border transition-colors"
          >
            {theme === "dark" ? "☀ Tema claro" : "☾ Tema escuro"}
          </button>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 rounded-md text-sm text-foreground hover:bg-border transition-colors"
        >
          {nav.logout}
        </button>
      </div>
    </aside>
  );
}
