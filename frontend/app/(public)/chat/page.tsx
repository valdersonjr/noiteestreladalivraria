"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-5">
          <Sparkles size={24} className="text-primary-600 dark:text-primary-400" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          Em breve: recomendações por IA
        </h1>

        <p className="text-sm text-muted leading-relaxed mb-8">
          Estamos desenvolvendo uma inteligência artificial que vai analisar
          nosso catálogo e indicar o livro ideal para você, baseado no seu
          gosto e nos livros que já leu. Por enquanto, fale direto com a Lara
          pelo WhatsApp.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
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
    </div>
  );
}
