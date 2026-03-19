"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { livrosService } from "@/services/livros";
import { adminLivrosService } from "@/services/admin/livros";
import { Livro } from "@/types/livro";
import { strings } from "@/lib/strings";
import { useToast } from "@/context/ToastContext";

const s = strings.admin.livros;

export default function AdminLivrosPage() {
  const { showToast } = useToast();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Livro | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  async function load() {
    try {
      const data = await livrosService.listar({});
      setLivros(data.items);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await adminLivrosService.deletar(confirmDelete.slug);
      setConfirmDelete(null);
      showToast("Livro excluído com sucesso!");
      await load();
    } finally {
      setDeleting(false);
    }
  }

  async function handleToggleDisponibilidade(livro: Livro) {
    setTogglingSlug(livro.slug);
    try {
      await adminLivrosService.atualizarDisponibilidade(livro.slug, { disponivel: !livro.disponivel });
      showToast(livro.disponivel ? "Livro marcado como indisponível." : "Livro marcado como disponível.");
      await load();
    } finally {
      setTogglingSlug(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{s.title}</h1>
        <Link href="/admin/livros/novo">
          <Button size="sm">{s.novo}</Button>
        </Link>
      </div>

      <Table<Livro>
        keyExtractor={(l) => l.id}
        data={livros}
        emptyMessage={strings.admin.common.semDados}
        columns={[
          { header: "Título", render: (l) => l.titulo },
          { header: "Autor", render: (l) => l.autor },
          { header: "Preço", render: (l) => `R$ ${l.preco.toFixed(2)}` },
          {
            header: "Condição",
            render: (l) => (
              <Badge variant={l.condicao === "novo" ? "primary" : "neutral"}>
                {strings.book.condition[l.condicao === "novo" ? "new" : "used"]}
              </Badge>
            ),
          },
          {
            header: "Disponível",
            render: (l) => (
              <Badge variant={l.disponivel ? "success" : "neutral"}>
                {l.disponivel ? s.disponivel : s.indisponivel}
              </Badge>
            ),
          },
          {
            header: "Ações",
            render: (l) => (
              <div className="flex gap-2">
                <Link href={`/admin/livros/${l.slug}/editar`}>
                  <Button size="sm" variant="outline">{s.editar}</Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  loading={togglingSlug === l.slug}
                  onClick={() => handleToggleDisponibilidade(l)}
                >
                  {s.alternarDisponibilidade}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmDelete(l)}
                >
                  {s.excluir}
                </Button>
              </div>
            ),
          },
        ]}
      />

      {confirmDelete && (
        <Modal
          title={s.confirmarExclusao}
          message={s.confirmarExclusaoMsg}
          onConfirm={handleDelete}
          onClose={() => setConfirmDelete(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
