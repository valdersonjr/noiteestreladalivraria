"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { strings } from "@/lib/strings";

const WHATSAPP_NUMBER = "5562984818938";

function buildWhatsappMessage(
  items: ReturnType<typeof useCart>["items"],
  total: number
) {
  const lista = items
    .map((item) => `📚 *${item.titulo}* de ${item.autor} por R$ ${item.preco.toFixed(2).replace(".", ",")}`)
    .join("\n");

  return (
    `Olá! Gostaria de comprar os seguintes livros da Noite Estrelada:\n\n` +
    `${lista}\n\n` +
    `*Total: R$ ${total.toFixed(2).replace(".", ",")}*\n\n` +
    `Podem confirmar a disponibilidade e combinar a entrega? 😊`
  );
}

function CartItemRow({
  item,
  onRemove,
}: {
  item: ReturnType<typeof useCart>["items"][0];
  onRemove: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-3 items-start py-4 border-b border-border last:border-0">
      {/* Thumbnail */}
      <div className="shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {!imgError ? (
          <img
            src={item.foto}
            alt={item.titulo}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-rose-100 dark:from-primary-900 dark:to-primary-800">
            <span className="text-base">📚</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/livros/${item.slug}`}
          className="text-sm font-semibold text-foreground line-clamp-2 leading-snug hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {item.titulo}
        </Link>
        <p className="text-xs text-muted mt-0.5 line-clamp-1">{item.autor}</p>
        <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mt-1">
          R$ {item.preco.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Remover */}
      <button
        onClick={onRemove}
        aria-label="Remover"
        className="shrink-0 text-muted hover:text-foreground transition-colors mt-0.5 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, clearCart, count, total } =
    useCart();

  // Trava o scroll do body quando o drawer está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsappMessage(items, total)
  )}`;

  return (
    <div
      className={[
        "fixed inset-0 z-50 transition-all duration-300",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={closeCart}
      />

      {/* Painel */}
      <div
        className={[
          "absolute right-0 top-0 h-full w-full max-w-sm bg-background shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary-600 dark:text-primary-400" />
            <h2 className="font-bold text-foreground text-base">
              {strings.cart.title}
            </h2>
            {count > 0 && (
              <span className="text-xs font-bold bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="text-muted hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo */}
        {count === 0 ? (
          /* Estado vazio */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-3">
            <span className="text-5xl">📚</span>
            <p className="font-semibold text-foreground">
              {strings.cart.empty}
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Explore o catálogo e adicione os livros que quiser.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={closeCart}
              className="mt-2"
            >
              <Link href="/">Ver catálogo</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-5 space-y-4 bg-background">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Total</span>
                <span className="text-xl font-black text-primary-600 dark:text-primary-400">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Nota */}
              <p className="text-xs text-muted leading-relaxed bg-primary-50 dark:bg-primary-950/50 rounded-xl p-3 border border-primary-100 dark:border-primary-900">
                Você será redirecionado para o WhatsApp para confirmar os livros
                e combinar entrega ou retirada com a loja. 🌟
              </p>

              {/* CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeCart}
                className="block"
              >
                <Button size="lg" className="w-full gap-2 justify-center">
                  <FaWhatsapp size={18} />
                  {strings.cart.sendWhatsapp}
                </Button>
              </a>

              {/* Limpar carrinho */}
              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors py-1"
              >
                <Trash2 size={12} />
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
