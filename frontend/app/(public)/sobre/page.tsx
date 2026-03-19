"use client";

import Link from "next/link";
import { MapPin, Instagram } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { strings } from "@/lib/strings";

/* ─── Dados da timeline ──────────────────────────────────────────────── */

const timeline = [
  {
    label: "A centelha",
    date: null,
    heading: "Tudo começou com um problema simples.",
    body: `Era tarde da noite. Lara fechou o último capítulo do livro e ficou ali,
           com aquela mistura de satisfação e angústia de quem termina uma boa história.
           Queria a continuação, agora. Mas a loja mais próxima ficava longe demais
           para uma compra por impulso.`,
    quote: "Se tivesse uma livraria aqui em Goianésia, seria tudo mais fácil.",
    quoteAuthor: "o pensamento que mudou tudo",
    accent: "rose",
  },
  {
    label: "A decisão",
    date: "11 de fevereiro de 2023",
    heading: "E se ela mesma abrisse uma?",
    body: `A ideia parecia simples. A execução, nem tanto. Lara foi de leitora
           a empreendedora sem nenhum manual, aprendendo a administrar uma loja
           enquanto montava as prateleiras. Pediu opiniões, ouviu o que precisava ouvir
           e, com muita dedicação e ajuda das pessoas certas, as portas abriram.`,
    quote: null,
    quoteAuthor: null,
    accent: "primary",
  },
  {
    label: "A validação",
    date: "Dia 1: inauguração",
    heading: "Goianésia estava esperando por isso.",
    body: `O primeiro post no Instagram foi ao ar. Em pouco tempo, as mensagens
           não paravam. Na inauguração, os livros (ainda poucos) esgotaram.
           Feedbacks chegavam de todos os lados: de leitores que não encontravam
           o que queriam na cidade, de pais em busca de livros para os filhos,
           de fãs de séries que esperavam por continuações.`,
    quote:
      "O estoque acabou no primeiro dia. Fizemos mais pedidos. E depois mais.",
    quoteAuthor: null,
    accent: "rose",
  },
  {
    label: "A pausa",
    date: null,
    heading: "Nem toda história é uma linha reta.",
    body: `Por motivos pessoais, a Noite Estrelada precisou pausar. O estoque foi
           vendido, as portas fecharam sem previsão de quando ou se voltaria.
           Essa parte da história não é escondida: ela faz parte de quem a gente é.
           Às vezes a vida pede uma pausa, e tudo bem.`,
    quote: "Mas as histórias que importam sempre encontram o caminho de volta.",
    quoteAuthor: null,
    accent: "primary",
  },
  {
    label: "O retorno",
    date: null,
    heading: "Um dia, tudo se alinhou novamente.",
    body: `A vontade estava lá. A oportunidade também. E começou a correria de novo:
           planejamentos, compras, ajustes, melhorias. Desta vez com mais clareza
           do que fazer e mais gratidão por poder fazer. O site que você está acessando
           agora faz parte desse recomeço.`,
    quote: null,
    quoteAuthor: null,
    accent: "rose",
  },
];

/* ─── Página ─────────────────────────────────────────────────────────── */

export default function SobrePage() {
  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-20 px-6 relative overflow-hidden">
        {/* Estrelas */}
        {[
          { t: "15%", l: "7%", s: 3 },
          { t: "60%", l: "3%", s: 2 },
          { t: "30%", l: "25%", s: 2 },
          { t: "10%", l: "70%", s: 3 },
          { t: "70%", l: "85%", s: 2 },
          { t: "45%", l: "92%", s: 3 },
          { t: "80%", l: "50%", s: 2 },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-on-primary opacity-40"
            style={{ top: s.t, left: s.l, width: s.s, height: s.s }}
            aria-hidden
          />
        ))}

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-primary-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <MapPin size={12} />
            {strings.site.location}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-on-primary mb-5 leading-tight">
            A nossa história
          </h1>
          <p className="text-on-primary/70 text-base md:text-lg leading-relaxed">
            Uma livraria nascida da necessidade de uma leitora,
            mantida viva pelo carinho de toda uma cidade.
          </p>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-300 to-primary-100 dark:from-primary-800 dark:via-primary-700 dark:to-primary-900 sm:left-6" />

          <div className="space-y-14">
            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-6 sm:gap-8">
                {/* Dot */}
                <div className="relative z-10 shrink-0 flex flex-col items-center">
                  <div
                    className={[
                      "w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg",
                      item.accent === "rose"
                        ? "bg-rose-400 border-rose-300 text-on-primary shadow-rose-400/30"
                        : "bg-primary-600 border-primary-500 text-on-primary shadow-primary-600/30",
                    ].join(" ")}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 pb-2">
                  {/* Label + data */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={[
                        "text-xs font-bold tracking-widest uppercase",
                        item.accent === "rose"
                          ? "text-rose-500 dark:text-rose-400"
                          : "text-primary-500 dark:text-primary-400",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                    {item.date && (
                      <span className="text-xs font-medium text-on-primary bg-primary-700 dark:bg-primary-800 px-2.5 py-0.5 rounded-full">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 leading-snug">
                    {item.heading}
                  </h2>

                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>

                  {/* Quote callout */}
                  {item.quote && (
                    <blockquote
                      className={[
                        "mt-4 pl-4 border-l-2 italic text-sm leading-relaxed",
                        item.accent === "rose"
                          ? "border-rose-400 text-rose-600 dark:text-rose-400"
                          : "border-primary-400 text-primary-600 dark:text-primary-400",
                      ].join(" ")}
                    >
                      <p>{item.quote}</p>
                      {item.quoteAuthor && (
                        <footer className="mt-1 text-xs text-muted not-italic">
                          {item.quoteAuthor}
                        </footer>
                      )}
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hoje ────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 dark:bg-primary-950/60 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-primary-200 dark:bg-primary-800" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary-500 dark:text-primary-400 shrink-0">
              Atualmente
            </span>
            <div className="h-px flex-1 bg-primary-200 dark:bg-primary-800" />
          </div>

          {/* Quote central */}
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center leading-snug mb-8">
            "Nosso desejo de trazer um fácil acesso à leitura está se refletindo
            em cada cliente que encontra aqui o livro que estava procurando."
          </p>

          <p className="text-center text-sm text-muted leading-relaxed mb-10 max-w-xl mx-auto">
            A Noite Estrelada é, acima de tudo, uma livraria feita por leitores
            para leitores. Cada compra, cada compartilhamento, cada mensagem de
            quem nos acompanha faz parte de uma história que só existe porque
            vocês estão nela.
          </p>

          {/* Cards de agradecimento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                emoji: "📚",
                label: "Livros",
                value: "novos e usados",
                desc: "para todo tipo de leitor",
              },
              {
                emoji: "🌟",
                label: "Desde",
                value: "fev. 2023",
                desc: "construindo comunidade",
              },
              {
                emoji: "📍",
                label: "Baseados em",
                value: "Goianésia",
                desc: "com entrega local",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-surface border border-border rounded-2xl p-5 text-center hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
              >
                <span className="text-3xl block mb-2">{card.emoji}</span>
                <p className="text-xs text-muted uppercase tracking-wide mb-1">
                  {card.label}
                </p>
                <p className="text-base font-bold text-foreground">
                  {card.value}
                </p>
                <p className="text-xs text-muted mt-0.5">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mensagem da Lara ────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <img
          src="/noite-estrelada-logo.png"
          alt="Noite Estrelada"
          width={180}
          height={180}
          className="mx-auto mb-6 shadow-lg shadow-primary-600/20"
        />
        <p className="text-sm text-muted uppercase tracking-widest font-semibold mb-3">
          Da fundadora
        </p>
        <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed italic mb-4">
          "Que a magia dos livros continue sempre a brilhar e se espalhar.
          Obrigada a cada um que fez e faz parte da nossa história."
        </blockquote>
        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
          Lara, Noite Estrelada
        </p>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-on-primary mb-3">
            Faça parte dessa história
          </h2>
          <p className="text-on-primary/70 text-sm mb-8 leading-relaxed">
            Siga a gente no Instagram para novidades, lançamentos e bastidores.
            Ou fale direto pelo WhatsApp, estamos sempre por perto.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.instagram.com/noiteestrelada.livraria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-on-primary! text-primary-900! hover:bg-rose-100! gap-2 font-semibold"
              >
                <FaInstagram size={18} />
                Seguir no Instagram
              </Button>
            </a>
            <a
              href="https://wa.me/5562984818938"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-on-primary/30! text-on-primary! hover:bg-primary-800! gap-2"
              >
                <FaWhatsapp size={18} />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
