"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Check, Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Livro } from "@/types/livro";
import { strings } from "@/lib/strings";

const NOVIDADE_DIAS = 7;

function isNovidade(criado_em: string) {
  const limite = Date.now() - NOVIDADE_DIAS * 24 * 60 * 60 * 1000;
  return new Date(criado_em).getTime() > limite;
}

interface BookCardProps {
  livro: Livro;
}

export function BookCard({ livro }: BookCardProps) {
  const [imgError, setImgError] = useState(false);
  const { addItem, isInCart, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCart = isInCart(livro.id);
  const isFav = isFavorite(livro.id);
  const novidade = isNovidade(livro.criado_em);
  const temOferta = livro.preco_oferta != null;
  const pctOff = temOferta
    ? Math.round((1 - livro.preco_oferta! / livro.preco) * 100)
    : 0;

  function handleCart(e: React.MouseEvent) {
    e.preventDefault();
    if (inCart) {
      openCart();
    } else {
      addItem(livro);
    }
  }

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    toggleFavorite(livro.id);
  }

  return (
    <div className="relative group">
      <Link
        href={`/livros/${livro.slug}`}
        className="flex flex-col rounded-xl overflow-hidden border border-border bg-surface hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200"
      >
        {/* Capa */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {!imgError ? (
            <img
              src={livro.foto}
              alt={livro.titulo}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
              <span className="text-4xl opacity-40">📚</span>
            </div>
          )}

          {/* Badge condição — top left */}
          <div className="absolute top-2 left-2">
            <Badge variant={livro.condicao === "novo" ? "primary" : "neutral"}>
              {strings.book.condition[livro.condicao === "novo" ? "new" : "used"]}
            </Badge>
          </div>

          {/* Badge OFERTA — top right */}
          {temOferta && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                -{pctOff}%
              </span>
            </div>
          )}

          {/* Badge NOVIDADE — bottom left */}
          {novidade && !temOferta && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                Novidade
              </span>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex flex-col flex-1 p-3 gap-1 pb-10">
          {livro.generos.length > 0 && (
            <p className="text-[11px] text-muted line-clamp-1 leading-none">
              {livro.generos
                .slice(0, 2)
                .map((g) => g.nome)
                .join(" · ")}
            </p>
          )}

          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {livro.titulo}
          </h3>

          <p className="text-xs text-muted line-clamp-1">
            {strings.book.by} {livro.autor}
          </p>

          <div className="mt-auto pt-2">
            {temOferta ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted line-through leading-none">
                  R$ {livro.preco.toFixed(2)}
                </span>
                <span className="text-base font-bold text-red-600 dark:text-red-400">
                  R$ {livro.preco_oferta!.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-base font-bold text-primary-600 dark:text-primary-400">
                R$ {livro.preco.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Botão favorito */}
      <button
        onClick={handleFavorite}
        aria-label={isFav ? "Remover dos favoritos" : "Salvar nos favoritos"}
        title={isFav ? "Remover dos favoritos" : "Salvar nos favoritos"}
        className={[
          "absolute bottom-3 right-12 z-10",
          "w-8 h-8 rounded-full flex items-center justify-center",
          "shadow-md transition-all duration-200",
          isFav
            ? "bg-red-500 text-white scale-110"
            : "bg-surface text-muted border border-border hover:text-red-500 hover:scale-110",
        ].join(" ")}
      >
        <Heart size={13} fill={isFav ? "currentColor" : "none"} strokeWidth={2} />
      </button>

      {/* Botão carrinho */}
      <button
        onClick={handleCart}
        aria-label={inCart ? "Ver carrinho" : "Adicionar ao carrinho"}
        title={inCart ? "Ver carrinho" : "Adicionar ao carrinho"}
        className={[
          "absolute bottom-3 right-3 z-10",
          "w-8 h-8 rounded-full flex items-center justify-center",
          "shadow-md transition-all duration-200",
          inCart
            ? "bg-success-600 text-white scale-110"
            : "bg-primary-600 text-on-primary hover:bg-primary-500 hover:scale-110",
        ].join(" ")}
      >
        {inCart ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={2.5} />}
      </button>
    </div>
  );
}
