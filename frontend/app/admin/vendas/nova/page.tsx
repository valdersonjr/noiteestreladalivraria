"use client";

import { useRouter } from "next/navigation";
import { VendaForm } from "@/components/admin/VendaForm";
import { adminVendasService } from "@/services/admin/vendas";
import { VendaCreate } from "@/types/venda";
import { strings } from "@/lib/strings";

export default function NovaVendaPage() {
  const router = useRouter();

  async function handleSubmit(data: VendaCreate) {
    await adminVendasService.criar(data);
    router.push("/admin/vendas");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{strings.admin.vendas.novaTitulo}</h1>
      <VendaForm onSubmit={handleSubmit} />
    </div>
  );
}
