"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  MessageCircle,
  Package,
  BookMarked,
  Tag,
  Banknote,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { strings } from "@/lib/strings";

/* ─── Dados ──────────────────────────────────────────────────────────── */

const buyerSteps = [
  {
    number: "01",
    icon: Search,
    title: "Explore o catálogo",
    description:
      "Navegue entre livros novos e usados. Filtre por gênero, condição ou preço para achar exatamente o que procura, sem precisar ir até a loja.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Monte sua lista",
    description:
      "Adicione os livros que quiser ao carrinho. Sem cadastro, sem login, sem complicação. Só escolher.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Envie pelo WhatsApp",
    description:
      "Com um clique, sua lista chega pra gente. Confirmamos a disponibilidade e combinamos entrega ou retirada.",
  },
  {
    number: "04",
    icon: Package,
    title: "Receba seu livro",
    description:
      "Aceitamos Pix e dinheiro. Entregamos em Goianésia ou você retira direto na loja.",
  },
];

const sellerBenefits = [
  {
    icon: BookMarked,
    title: "Você cadastra, a gente lista",
    description:
      "Nos conta o livro pelo WhatsApp. A gente cuida da foto, descrição e publicação no catálogo. O livro fica com você até aparecer um comprador.",
  },
  {
    icon: Tag,
    title: "Definimos o preço juntos",
    description:
      "Você sugere o valor, a gente orienta com base no mercado. Transparência do início ao fim.",
  },
  {
    icon: Banknote,
    title: "Comprador apareceu? Aí a gente busca",
    description:
      "Só buscamos o livro quando houver um comprador confirmado. Sem risco, sem pressa, sem compromisso antes da hora.",
  },
];

const faqs = [
  {
    q: "Fazem entrega fora de Goianésia?",
    a: "No momento atendemos apenas Goianésia - GO. Para regiões próximas, entre em contato pelo WhatsApp para verificarmos uma possibilidade.",
  },
  {
    q: "Como sei que o livro ainda está disponível?",
    a: "O catálogo é atualizado em tempo real. Quando um livro é vendido, ele sai automaticamente do site. Mas se quiser garantir, mande uma mensagem antes de confirmar.",
  },
  {
    q: "Posso reservar um livro?",
    a: "Sim! Entre em contato pelo WhatsApp com o nome do livro. Reservamos por até 24 horas enquanto você decide.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix e dinheiro. O pagamento é feito no ato da entrega ou retirada.",
  },
  {
    q: "Em quanto tempo recebo o pagamento pela venda do meu livro?",
    a: "Logo após a venda ser confirmada e o livro ser retirado com você. Combinamos o método (Pix ou dinheiro) na hora.",
  },
  {
    q: "Quais livros vocês aceitam para vender?",
    a: "Romances, técnicos, didáticos, quadrinhos, infantis: avaliamos todos. O critério principal é que estejam em bom estado de leitura.",
  },
];

/* ─── Componentes internos ────────────────────────────────────────────── */

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  index,
  total,
}: (typeof buyerSteps)[0] & { index: number; total: number }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Linha conectora entre cards (desktop) */}
      {index < total - 1 && (
        <div
          className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px bg-gradient-to-r from-primary-200 to-transparent z-0"
          aria-hidden
        />
      )}

      {/* Número decorativo */}
      <span className="text-7xl font-black text-primary-100 dark:text-primary-900 leading-none select-none mb-2 transition-colors group-hover:text-primary-200 dark:group-hover:text-primary-800">
        {number}
      </span>

      {/* Ícone */}
      <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/20 -mt-6 z-10 group-hover:bg-primary-500 transition-colors">
        <Icon className="w-6 h-6 text-on-primary" />
      </div>

      {/* Texto */}
      <div className="mt-4 space-y-2 px-2">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SellerCard({
  icon: Icon,
  title,
  description,
}: (typeof sellerBenefits)[0]) {
  return (
    <div className="flex gap-4 items-start p-5 rounded-2xl bg-surface border border-border hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-400/15 dark:bg-rose-400/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-rose-500 dark:text-rose-400" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={[
            "w-4 h-4 text-muted shrink-0 transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/* Accordion animado com grid */}
      <div
        className={[
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted leading-relaxed pb-4">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Página ─────────────────────────────────────────────────────────── */

export default function ComoFuncionaPage() {
  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary-300 text-xs font-semibold tracking-widest uppercase mb-3">
            {strings.site.name}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-on-primary mb-4 leading-tight">
            Como funciona
          </h1>
          <p className="text-on-primary/70 text-base md:text-lg leading-relaxed">
            Somos uma livraria local em{" "}
            <span className="text-primary-300 font-medium">
              Goianésia - GO
            </span>
            . Aqui você compra livros novos e usados com facilidade e também
            pode vender os seus sem sair de casa.
          </p>
        </div>
      </section>

      {/* ── Como comprar ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Comprar é simples
          </h2>
          <p className="text-muted mt-2 text-sm">
            Do catálogo ao seu bolso em poucos passos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {buyerSteps.map((step, i) => (
            <StepCard
              key={step.number}
              {...step}
              index={i}
              total={buyerSteps.length}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/novos">
            <Button size="lg">Ver catálogo</Button>
          </Link>
        </div>
      </section>

      {/* ── Consignação ─────────────────────────────────────────────── */}
      <section className="bg-primary-50 dark:bg-primary-950/60 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Texto esquerdo */}
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-500 mb-3">
                Para quem quer vender
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                Tem livros parados?{" "}
                <span className="text-primary-600 dark:text-primary-400">
                  A gente vende pra você.
                </span>
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Simples assim: você nos conta o livro que quer vender, a gente
                publica no catálogo com foto e descrição. O livro{" "}
                <strong className="text-foreground">fica com você</strong> até
                aparecer um comprador. Só então combinamos a retirada. Sem
                burocracia, sem risco, sem precisar se desfazer do livro antes
                da hora.
              </p>

              <a
                href="https://wa.me/5562984818938"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="md" className="gap-2">
                  <FaWhatsapp size={16} />
                  Quero colocar meu livro à venda
                </Button>
              </a>
            </div>

            {/* Cards direita */}
            <div className="flex flex-col gap-3">
              {sellerBenefits.map((b) => (
                <SellerCard key={b.title} {...b} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sobre a loja ────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-muted mb-3">
          <MapPin size={13} />
          {strings.site.location}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Uma livraria que conhece seus clientes
        </h2>
        <p className="text-muted text-sm leading-relaxed">
          Não somos um marketplace gigante. Somos uma livraria de bairro onde
          cada livro é avaliado com cuidado, cada compra é confirmada
          pessoalmente e cada vendedor é tratado com respeito. O catálogo online
          é uma extensão do que você encontraria pessoalmente.
        </p>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 dark:bg-primary-950/60 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              Perguntas frequentes
            </h2>
            <p className="text-muted text-sm mt-1">
              Tem mais dúvidas? Fale pelo WhatsApp.
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-border px-6 divide-y divide-border">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-on-primary mb-3">
            Ainda com dúvidas?
          </h2>
          <p className="text-on-primary/70 text-sm mb-7">
            Manda uma mensagem. Respondemos rapidinho.
          </p>
          <a
            href="https://wa.me/5562984818938"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-on-primary! text-primary-900! hover:bg-rose-100! gap-2 font-semibold"
            >
              <FaWhatsapp size={18} />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
