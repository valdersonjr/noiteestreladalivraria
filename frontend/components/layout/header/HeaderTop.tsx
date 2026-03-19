import Link from "next/link";
import { ShoppingCart, Sun, Moon, MapPin, Menu, X } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { strings } from "@/lib/strings";
import { useCart } from "@/context/CartContext";
import { HeaderSearch } from "./HeaderSearch";

interface HeaderTopProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  theme: string | undefined;
  onThemeToggle: () => void;
}

export function HeaderTop({ menuOpen, onMenuToggle, theme, onThemeToggle }: HeaderTopProps) {
  const { count, openCart } = useCart();

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-primary-700 md:flex-nowrap md:gap-3">

      {/* Logo — order 1 */}
      <Link href="/" className="shrink-0 order-1" aria-label={strings.site.name}>
        <img
          src="/noite-estrelada-logo.png"
          alt={strings.site.name}
          width={52}
          height={52}
        />
      </Link>

      {/* Localização — desktop, order 2 */}
      <div className="hidden md:flex items-center gap-1 text-xs text-on-primary shrink-0 opacity-80 md:order-2">
        <MapPin size={13} />
        <span>{strings.site.location}</span>
      </div>

      {/* Barra de pesquisa — order 3: linha própria no mobile, flex-1 no desktop */}
      <div className="w-full order-3 md:flex-1 md:w-auto">
        <HeaderSearch />
      </div>

      {/* Ações — order 2 no mobile (ml-auto empurra para direita), order 4 no desktop */}
      <div className="flex items-center gap-2 shrink-0 text-on-primary order-2 ml-auto md:ml-0 md:order-4">

        {/* Redes sociais — desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" aria-label="WhatsApp">
            <FaWhatsapp size={19} />
          </Button>
          <a
            href="https://www.instagram.com/noiteestrelada.livraria/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Button variant="ghost" size="sm" aria-label="Instagram">
              <FaInstagram size={19} />
            </Button>
          </a>
        </div>

        {/* Carrinho */}
        <Button
          variant="ghost"
          size="sm"
          aria-label={strings.header.cartLabel}
          className="relative"
          onClick={openCart}
        >
          <ShoppingCart size={21} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-badge-bg text-badge-text text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>

        {/* Alternar tema */}
        <Button variant="ghost" size="sm" aria-label={strings.header.themeToggle} onClick={onThemeToggle}>
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </Button>

        {/* Hamburguer — mobile */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label={menuOpen ? strings.header.closeMenu : strings.header.openMenu}
          onClick={onMenuToggle}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </Button>
      </div>
    </div>
  );
}
