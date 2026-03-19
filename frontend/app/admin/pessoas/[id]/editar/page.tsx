"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PessoaForm } from "@/components/admin/PessoaForm";
import { adminPessoasService } from "@/services/admin/pessoas";
import { Pessoa, PessoaCreate } from "@/types/pessoa";
import { strings } from "@/lib/strings";

export default function EditarPessoaPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminPessoasService.buscarPorId(parseInt(id)).then((p) => {
      setPessoa(p);
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(data: PessoaCreate) {
    await adminPessoasService.atualizar(parseInt(id), data);
    router.push("/admin/pessoas");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!pessoa) return <p className="text-muted">{strings.admin.common.erro}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{strings.admin.pessoas.editarTitulo}</h1>
      <PessoaForm
        defaultValues={{ nome: pessoa.nome, telefone: pessoa.telefone, email: pessoa.email ?? "" }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
