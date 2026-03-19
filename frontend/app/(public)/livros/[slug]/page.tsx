"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Tag, ShoppingCart, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { livrosService } from "@/services/livros";
import { Livro } from "@/types/livro";
import { strings } from "@/lib/strings";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "5562984818938";

function buildWhatsappUrl(livro: Livro) {
  const msg = `Olá! Tenho interesse no livro *${livro.titulo}* de ${livro.autor} por R$ ${livro.preco.toFixed(2).replace(".", ",")}. Ainda está disponível?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ─── Skeleton ───────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-[3/4] rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-5 w-18 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="h-8 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />
          <div className="h-10 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-11 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-11 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-4/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Página ─────────────────────────────────────────────────────────── */

export default function LivroPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { addItem, isInCart, openCart } = useCart();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    livrosService
      .buscarPorSlug(slug)
      .then(setLivro)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Skeleton />;

  if (notFound || !livro) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">📚</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Livro não encontrado
        </h1>
        <p className="text-muted text-sm mb-8">
          Esse livro pode ter sido vendido ou removido do catálogo.
        </p>
        <Link href="/">
          <Button>Ver catálogo</Button>
        </Link>
      </div>
    );
  }

  const isNovo = livro.condicao === "novo";
  const inCart = isInCart(livro.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* ── Voltar ────────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Voltar
      </button>

      {/* ── Conteúdo principal ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
        {/* ── Capa ──────────────────────────────────────────────── */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-xl shadow-primary-950/10 dark:shadow-primary-950/40">
              {!imgError ? (
                <img
                  src={livro.foto}
                  alt={livro.titulo}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-100 to-rose-100 dark:from-primary-900 dark:to-primary-800">
                  <BookOpen
                    size={48}
                    className="text-primary-300 dark:text-primary-600"
                  />
                  <span className="text-sm text-muted text-center px-6">
                    {livro.titulo}
                  </span>
                </div>
              )}

              {/* Badge de condição */}
              {!livro.disponivel && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center rounded-2xl">
                  <span className="bg-background text-foreground text-sm font-bold px-4 py-2 rounded-full">
                    Indisponível
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Informações ───────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {/* Gêneros + condição */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={isNovo ? "primary" : "neutral"}>
              {strings.book.condition[isNovo ? "new" : "used"]}
            </Badge>
            {livro.generos.map((g) => (
              <Badge key={g.id} variant="neutral">
                {g.nome}
              </Badge>
            ))}
          </div>

          {/* Título e autor */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-2">
              {livro.titulo}
            </h1>
            <p className="text-base text-muted">
              {strings.book.by}{" "}
              <span className="font-medium text-foreground">{livro.autor}</span>
            </p>
          </div>

          <div className="h-px bg-border" />

          {/* Preço */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wide mb-1">
              Preço
            </p>
            <p className="text-4xl font-black text-primary-600 dark:text-primary-400 leading-none">
              R${" "}
              <span>
                {livro.preco.toFixed(2).replace(".", ",")}
              </span>
            </p>
            {livro.disponivel && (
              <p className="text-xs text-muted mt-2 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-success-600" />
                Disponível para compra
              </p>
            )}
          </div>

          {/* CTAs */}
          {livro.disponivel ? (
            <div className="flex flex-col gap-3">
              {/* Adicionar ao carrinho */}
              <Button
                size="lg"
                className="w-full gap-2 justify-center"
                variant={inCart ? "outline" : "primary"}
                onClick={() => (inCart ? openCart() : addItem(livro))}
              >
                {inCart ? (
                  <>
                    <Check size={18} />
                    No carrinho · ver carrinho
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Adicionar ao carrinho
                  </>
                )}
              </Button>

              {/* WhatsApp direto */}
              <a
                href={buildWhatsappUrl(livro)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 justify-center"
                >
                  <FaWhatsapp size={18} />
                  Comprar só este pelo WhatsApp
                </Button>
              </a>

              <p className="text-xs text-center text-muted">
                Adicione ao carrinho para comprar vários de uma vez, ou compre
                este diretamente pelo WhatsApp.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-4 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                Este livro não está mais disponível.
              </p>
              <p className="text-xs text-muted mb-3">
                Mas temos outros títulos que podem te interessar.
              </p>
              <Link href={isNovo ? "/novos" : "/usados"}>
                <Button variant="outline" size="sm">
                  Ver livros {isNovo ? "novos" : "usados"}
                </Button>
              </Link>
            </div>
          )}

          <div className="h-px bg-border" />

          {/* Descrição */}
          <div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
              <Tag size={13} className="text-muted" />
              Sobre o livro
            </h2>
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {livro.descricao}
            </p>
          </div>

          {/* Detalhes adicionais */}
          <div className="rounded-xl bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900 p-4 space-y-2.5">
            {[
              { label: "Condição", value: strings.book.condition[isNovo ? "new" : "used"] },
              { label: "Entrega", value: "Goianésia - GO" },
              { label: "Pagamento", value: "Pix · Dinheiro" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-medium text-foreground text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
