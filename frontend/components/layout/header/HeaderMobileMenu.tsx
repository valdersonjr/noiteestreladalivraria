"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { strings } from "@/lib/strings";
import { navLinks } from "./HeaderNav";

interface HeaderMobileMenuProps {
  onClose: () => void;
}

export function HeaderMobileMenu({ onClose }: HeaderMobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden bg-primary-800 px-4 py-4 flex flex-col gap-4">

      {/* Localização */}
      <div className="flex items-center gap-1 text-xs text-on-primary opacity-80">
        <MapPin size={13} />
        <span>{strings.site.location}</span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={[
              "px-3 py-2 rounded text-sm text-on-primary transition-colors",
              pathname === link.href
                ? "bg-primary-600 font-medium"
                : "hover:bg-primary-600",
            ].join(" ")}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Redes sociais */}
      <div className="flex items-center gap-4 pt-3 border-t border-primary-600">
        <Button variant="ghost" size="sm" aria-label="WhatsApp" className="gap-2 text-sm text-on-primary opacity-80">
          <FaWhatsapp size={17} /> WhatsApp
        </Button>
        <a
          href="https://www.instagram.com/noiteestrelada.livraria/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" aria-label="Instagram" className="gap-2 text-sm text-on-primary opacity-80">
            <FaInstagram size={17} /> Instagram
          </Button>
        </a>
      </div>
    </div>
  );
}
