"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { adminPessoasService } from "@/services/admin/pessoas";
import { Pessoa } from "@/types/pessoa";
import { strings } from "@/lib/strings";
import { useToast } from "@/context/ToastContext";

const s = strings.admin.pessoas;

export default function AdminPessoasPage() {
  const { showToast } = useToast();
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Pessoa | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const data = await adminPessoasService.listar();
      setPessoas(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await adminPessoasService.deletar(confirmDelete.id);
      setConfirmDelete(null);
      showToast("Pessoa excluída com sucesso!");
      await load();
    } finally {
      setDeleting(false);
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
        <Link href="/admin/pessoas/nova">
          <Button size="sm">{s.nova}</Button>
        </Link>
      </div>

      <Table<Pessoa>
        keyExtractor={(p) => p.id}
        data={pessoas}
        emptyMessage={strings.admin.common.semDados}
        columns={[
          { header: "Nome", render: (p) => p.nome },
          { header: "Telefone", render: (p) => p.telefone },
          { header: "E-mail", render: (p) => p.email ?? "-" },
          {
            header: "Cadastro",
            render: (p) => new Date(p.criado_em).toLocaleDateString("pt-BR"),
          },
          {
            header: "Ações",
            render: (p) => (
              <div className="flex gap-2">
                <Link href={`/admin/pessoas/${p.id}/editar`}>
                  <Button size="sm" variant="outline">{s.editar}</Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(p)}>
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
