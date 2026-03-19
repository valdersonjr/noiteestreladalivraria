"use client";

import { useRouter } from "next/navigation";
import { LivroForm } from "@/components/admin/LivroForm";
import { adminLivrosService } from "@/services/admin/livros";
import { LivroCreate } from "@/types/livro";
import { strings } from "@/lib/strings";

export default function NovoLivroPage() {
  const router = useRouter();

  async function handleSubmit(data: LivroCreate) {
    await adminLivrosService.criar(data);
    router.push("/admin/livros");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{strings.admin.livros.novoTitulo}</h1>
      <LivroForm onSubmit={handleSubmit} />
    </div>
  );
}
