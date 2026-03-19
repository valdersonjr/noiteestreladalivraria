"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { adminVendasService } from "@/services/admin/vendas";
import { Venda, VendaStatus } from "@/types/venda";
import { strings } from "@/lib/strings";
import { Tooltip } from "@/components/ui/Tooltip";
import { useToast } from "@/context/ToastContext";

const s = strings.admin.vendas;
const statusVariant: Record<VendaStatus, "warning" | "success" | "neutral"> = {
  pendente: "warning",
  concluida: "success",
  cancelada: "neutral",
};

export default function AdminVendasPage() {
  const { showToast } = useToast();
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);

  async function load() {
    try {
      const data = await adminVendasService.listar();
      setVendas(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleRepasse(id: number) {
    setActionId(id);
    try {
      await adminVendasService.registrarRepasse(id);
      showToast("Repasse registrado com sucesso!");
      await load();
    } finally {
      setActionId(null);
    }
  }

  async function handleStatus(id: number, status: string) {
    setActionId(id);
    try {
      await adminVendasService.atualizarStatus(id, status);
      showToast(status === "concluida" ? "Venda concluída!" : "Venda cancelada.");
      await load();
    } finally {
      setActionId(null);
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
        <Link href="/admin/vendas/nova">
          <Button size="sm">{s.nova}</Button>
        </Link>
      </div>

      <Table<Venda>
        keyExtractor={(v) => v.id}
        data={vendas}
        emptyMessage={strings.admin.common.semDados}
        columns={[
          { header: "Livro", render: (v) => v.livro_titulo },
          { header: "Comprador", render: (v) => v.comprador_nome },
          { header: "Valor", render: (v) => `R$ ${v.preco_venda.toFixed(2)}` },
          {
            header: "Lucro",
            render: (v) =>
              v.status === "cancelada" ? (
                <span className="text-muted">—</span>
              ) : (
                <span className="font-medium text-success-600">R$ {v.lucro.toFixed(2)}</span>
              ),
          },
          { header: "Pagamento", render: (v) => v.forma_pagamento },
          {
            header: "Status",
            render: (v) => (
              <Badge variant={statusVariant[v.status as VendaStatus]}>
                {s.status[v.status as VendaStatus]}
              </Badge>
            ),
          },
          {
            header: (
              <Tooltip text="Valor a devolver ao vendedor do livro após descontar a comissão da livraria.">
                <span>Repasse</span>
                <span className="text-muted cursor-help">ⓘ</span>
              </Tooltip>
            ),
            render: (v) => {
              if (v.status === "cancelada") return <span className="text-sm text-muted">—</span>;
              if (v.repasse_realizado) return <span className="text-sm text-muted">{s.repasseFeito}</span>;
              return (
                <Button
                  size="sm"
                  variant="outline"
                  loading={actionId === v.id}
                  onClick={() => handleRepasse(v.id)}
                >
                  {s.repasse}
                </Button>
              );
            },
          },
          {
            header: "Ações",
            render: (v) => (
              <div className="flex gap-1">
                {v.status === "pendente" && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      loading={actionId === v.id}
                      onClick={() => handleStatus(v.id, "concluida")}
                    >
                      Concluir
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      loading={actionId === v.id}
                      onClick={() => handleStatus(v.id, "cancelada")}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
