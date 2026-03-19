"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { adminVendasService } from "@/services/admin/vendas";
import { adminPessoasService } from "@/services/admin/pessoas";
import { Venda, VendaStatus } from "@/types/venda";
import { strings } from "@/lib/strings";

const { dashboard } = strings.admin;

const statusVariant: Record<VendaStatus, "warning" | "success" | "neutral"> = {
  pendente: "warning",
  concluida: "success",
  cancelada: "neutral",
};

const statusLabel = strings.admin.vendas.status;

export default function AdminDashboardPage() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [counts, setCounts] = useState({ vendas: 0, pessoas: 0, bruto: 0, liquido: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [v, p] = await Promise.all([
          adminVendasService.listar(),
          adminPessoasService.listar(),
        ]);
        setVendas(v);
        const vendasAtivas = v.filter((venda) => venda.status !== "cancelada");
        const bruto = vendasAtivas.reduce((sum, venda) => sum + venda.preco_venda, 0);
        const liquido = vendasAtivas.reduce((sum, venda) => sum + venda.lucro, 0);
        setCounts({ vendas: vendasAtivas.length, pessoas: p.length, bruto, liquido });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="w-6 h-6 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const recentVendas = vendas.filter((v) => v.status !== "cancelada").slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-foreground">{dashboard.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={dashboard.totalVendas} value={counts.vendas} />
        <StatCard label={dashboard.totalPessoas} value={counts.pessoas} />
        <StatCard label={dashboard.faturamentoBruto} value={counts.bruto} currency />
        <StatCard label={dashboard.faturamentoLiquido} value={counts.liquido} currency />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">{dashboard.vendasRecentes}</h2>
        <Table<Venda>
          keyExtractor={(v) => v.id}
          data={recentVendas}
          emptyMessage={strings.admin.common.semDados}
          columns={[
            { header: "Livro", render: (v) => v.livro_titulo },
            { header: "Comprador", render: (v) => v.comprador_nome },
            { header: "Valor", render: (v) => `R$ ${v.preco_venda.toFixed(2)}` },
            {
              header: "Status",
              render: (v) => (
                <Badge variant={statusVariant[v.status as VendaStatus]}>
                  {statusLabel[v.status as VendaStatus]}
                </Badge>
              ),
            },
          ]}
        />
        {vendas.length > 5 && (
          <Link href="/admin/vendas" className="text-sm text-primary-500 hover:underline mt-2 inline-block">
            Ver todas as vendas →
          </Link>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, currency }: { label: string; value: number; currency?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">
        {currency ? `R$ ${value.toFixed(2)}` : value}
      </p>
    </div>
  );
}
