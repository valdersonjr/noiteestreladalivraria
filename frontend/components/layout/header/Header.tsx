"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HeaderTop } from "./HeaderTop";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      <HeaderTop
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        theme={mounted ? theme : undefined}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <HeaderNav />
      {menuOpen && <HeaderMobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
