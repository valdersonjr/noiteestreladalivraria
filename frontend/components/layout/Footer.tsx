import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { strings } from "@/lib/strings";

const navLinks = [
  { label: strings.nav.about, href: "/sobre" },
  { label: strings.nav.howItWorks, href: "/como-funciona" },
  { label: strings.nav.newBooks, href: "/novos" },
  { label: strings.nav.usedBooks, href: "/usados" },
  { label: strings.nav.deals, href: "/ofertas" },
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-on-primary mt-auto">

      {/* Blocos principais */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 gap-8 md:grid-cols-3">

        {/* Bloco 1 — Marca */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/noite-estrelada-logo.png"
              alt={strings.site.name}
              width={72}
              height={72}
            />
            <span className="font-bold text-lg">{strings.site.name}</span>
          </div>
          <p className="text-sm opacity-70">{strings.footer.tagline}</p>
          <div className="flex items-center gap-3 mt-1">
            <button aria-label="WhatsApp" className="opacity-70 hover:opacity-100 transition-opacity">
              <FaWhatsapp size={20} />
            </button>
            <a
              href="https://www.instagram.com/noiteestrelada.livraria/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Bloco 2 — Navegação */}
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-sm uppercase tracking-wide opacity-60">
            {strings.footer.navTitle}
          </span>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bloco 3 — Contato */}
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-sm uppercase tracking-wide opacity-60">
            {strings.footer.contactTitle}
          </span>
          <div className="flex items-center gap-2 text-sm opacity-70">
            <MapPin size={14} />
            <span>{strings.site.location}</span>
          </div>
          <button className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity w-fit">
            <FaWhatsapp size={16} />
            <span>{strings.footer.whatsapp}</span>
          </button>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="border-t border-on-primary/10 px-6 py-4">
        <p className="text-center text-xs opacity-50">{strings.footer.copyright}</p>
      </div>

    </footer>
  );
}
