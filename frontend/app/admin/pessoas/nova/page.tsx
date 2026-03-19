"use client";

import { useRouter } from "next/navigation";
import { PessoaForm } from "@/components/admin/PessoaForm";
import { adminPessoasService } from "@/services/admin/pessoas";
import { PessoaCreate } from "@/types/pessoa";
import { strings } from "@/lib/strings";

export default function NovaPessoaPage() {
  const router = useRouter();

  async function handleSubmit(data: PessoaCreate) {
    await adminPessoasService.criar(data);
    router.push("/admin/pessoas");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{strings.admin.pessoas.novaTitulo}</h1>
      <PessoaForm onSubmit={handleSubmit} />
    </div>
  );
}
