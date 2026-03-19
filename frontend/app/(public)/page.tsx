"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BookSection } from "@/components/catalog/BookSection";
import { livrosService } from "@/services/livros";
import { Livro } from "@/types/livro";
import { strings } from "@/lib/strings";

const PREVIEW_COUNT = 6;

/* ——— Estrelas decorativas (Noite Estrelada) ——— */
const STARS = [
  { top: "12%", left: "8%", size: 3, opacity: 0.6 },
  { top: "28%", left: "17%", size: 2, opacity: 0.4 },
  { top: "8%", left: "35%", size: 4, opacity: 0.5 },
  { top: "55%", left: "5%", size: 2, opacity: 0.35 },
  { top: "70%", left: "22%", size: 3, opacity: 0.5 },
  { top: "18%", left: "55%", size: 2, opacity: 0.4 },
  { top: "40%", left: "72%", size: 4, opacity: 0.55 },
  { top: "10%", left: "82%", size: 3, opacity: 0.45 },
  { top: "65%", left: "88%", size: 2, opacity: 0.4 },
  { top: "80%", left: "65%", size: 3, opacity: 0.5 },
  { top: "48%", left: "90%", size: 2, opacity: 0.35 },
  { top: "85%", left: "40%", size: 3, opacity: 0.45 },
];

export default function HomePage() {
  const [novos, setNovos] = useState<Livro[]>([]);
  const [usados, setUsados] = useState<Livro[]>([]);
  const [ofertas, setOfertas] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [resNovos, resUsados, resOfertas] = await Promise.all([
          livrosService.listar({ condicao: "novo", ordenar: "recente" }),
          livrosService.listar({ condicao: "usado", ordenar: "recente" }),
          livrosService.listar({ ordenar: "preco_asc" }),
        ]);
        setNovos(resNovos.items.slice(0, PREVIEW_COUNT));
        setUsados(resUsados.items.slice(0, PREVIEW_COUNT));
        setOfertas(resOfertas.items.slice(0, PREVIEW_COUNT));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* ——— Hero ——— */}
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-24 px-6 overflow-hidden">
        {/* Estrelas */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-on-primary"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>

        {/* Conteúdo */}
        <div className="relative max-w-3xl mx-auto text-center">
          <img
            src="/noite-estrelada-logo.png"
            alt={strings.site.name}
            width={180}
            height={180}
            className="mx-auto mb-5"
          />
          <p className="text-primary-300 text-sm font-medium tracking-widest uppercase mb-3">
            {strings.site.location}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-on-primary mb-5 leading-tight tracking-tight">
            {strings.site.name}
          </h1>
          <p className="text-on-primary/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            {strings.site.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/novos">
              <Button
                size="lg"
                className="bg-on-primary! text-primary-900! hover:bg-primary-100! font-semibold shadow-lg"
              >
                Livros Novos
              </Button>
            </Link>
            <Link href="/usados">
              <Button
                size="lg"
                variant="outline"
                className="border-on-primary/40! text-on-primary! hover:bg-primary-800!"
              >
                Livros Usados
              </Button>
            </Link>
            <Link href="/ofertas">
              <Button
                size="lg"
                variant="ghost"
                className="text-primary-200! hover:text-on-primary! hover:bg-primary-800!"
              >
                Ver ofertas ✨
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Seções ——— */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        <BookSection
          title="✨ Ofertas"
          subtitle="Os melhores preços da livraria"
          livros={ofertas}
          verTodosHref="/ofertas"
          loading={loading}
        />

        <BookSection
          title="Livros Novos"
          subtitle="Recém-chegados e em perfeito estado"
          livros={novos}
          verTodosHref="/novos"
          loading={loading}
        />

        <BookSection
          title="Livros Usados"
          subtitle="Histórias com vida própria, a preços especiais"
          livros={usados}
          verTodosHref="/usados"
          loading={loading}
        />
      </div>
    </div>
  );
}
