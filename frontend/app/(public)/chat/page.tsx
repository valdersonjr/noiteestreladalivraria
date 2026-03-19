"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">

      {/* Conteúdo — sempre centralizado */}
      <div className="relative z-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Em breve: recomendações por IA
        </h1>

        <p className="text-sm text-muted leading-relaxed mb-8">
          Estamos desenvolvendo uma inteligência artificial que vai analisar
          nosso catálogo e indicar o livro ideal para você, baseado no seu
          gosto e nos livros que já leu. Por enquanto, fale direto com a Lara
          pelo WhatsApp.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <a
            href="https://wa.me/5562984818938"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2">
              <FaWhatsapp size={18} />
              Pedir uma indicação
            </Button>
          </a>
          <Link href="/">
            <Button size="lg" variant="outline">
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>

      {/* Avatar — absoluto colado no rodapé em ambos os tamanhos */}
      <img
        src="/avatar-larinha.png"
        alt="Lara"
        className="absolute bottom-0 left-0 h-36 md:h-[90%] w-auto object-contain object-bottom pointer-events-none select-none"
      />
    </div>
  );
}
