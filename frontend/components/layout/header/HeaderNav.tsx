"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { strings } from "@/lib/strings";

const navLinks = [
  { label: strings.nav.home, href: "/" },
  { label: strings.nav.recommend, href: "/chat" },
  { label: strings.nav.deals, href: "/ofertas" },
  { label: strings.nav.newBooks, href: "/novos" },
  { label: strings.nav.usedBooks, href: "/usados" },
  { label: strings.nav.howItWorks, href: "/como-funciona" },
  { label: strings.nav.about, href: "/sobre" },
];

export { navLinks };

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-center items-center gap-1 px-4 py-1.5 bg-primary-800 overflow-x-auto">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "whitespace-nowrap px-3 py-1 rounded text-sm text-on-primary transition-colors",
              isActive
                ? "bg-primary-600 opacity-100 font-medium"
                : "opacity-90 hover:opacity-100 hover:bg-primary-600",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
