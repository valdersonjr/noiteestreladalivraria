"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LivroForm } from "@/components/admin/LivroForm";
import { livrosService } from "@/services/livros";
import { adminLivrosService } from "@/services/admin/livros";
import { Livro, LivroCreate } from "@/types/livro";
import { strings } from "@/lib/strings";

export default function EditarLivroPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    livrosService.buscarPorSlug(slug).then((l) => {
      setLivro(l);
      setLoading(false);
    });
  }, [slug]);

  async function handleSubmit(data: LivroCreate) {
    await adminLivrosService.atualizar(slug, data);
    router.push("/admin/livros");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!livro) return <p className="text-muted">{strings.admin.common.erro}</p>;

  const defaultValues: Partial<LivroCreate> = {
    titulo: livro.titulo,
    autor: livro.autor,
    preco: livro.preco,
    condicao: livro.condicao,
    descricao: livro.descricao,
    foto: livro.foto,
    genero_ids: livro.generos.map((g) => g.id),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{strings.admin.livros.editarTitulo}</h1>
      <LivroForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  );
}
