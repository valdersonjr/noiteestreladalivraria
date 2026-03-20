import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartDrawer } from "@/components/catalog/CartDrawer";
import { BackToTop } from "@/components/ui/BackToTop";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <BackToTop />
      </CartProvider>
    </FavoritesProvider>
  );
}
