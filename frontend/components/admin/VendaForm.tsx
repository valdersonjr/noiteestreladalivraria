"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import { strings } from "@/lib/strings";
import { VendaCreate } from "@/types/venda";
import { livrosService } from "@/services/livros";
import { adminPessoasService } from "@/services/admin/pessoas";
import { useToast } from "@/context/ToastContext";

const { campos, salvar, salvando, formasPagamento } = strings.admin.vendas;

interface VendaFormProps {
  onSubmit: (data: VendaCreate) => Promise<void>;
}

const pagamentoOptions = [
  { value: "pix", label: formasPagamento.pix },
  { value: "dinheiro", label: formasPagamento.dinheiro },
];

export function VendaForm({ onSubmit }: VendaFormProps) {
  const { showToast } = useToast();

  const [form, setForm] = useState<VendaCreate>({
    livro_id: 0,
    comprador_id: 0,
    preco_venda: 0,
    taxa_comissao: 10,
    taxa_entrega: undefined,
    forma_pagamento: "pix",
    observacoes: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [livroOptions, setLivroOptions] = useState<{ value: number; label: string }[]>([]);
  const [pessoaOptions, setPessoaOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    livrosService.listar({}).then((data) =>
      setLivroOptions(data.items.map((l) => ({ value: l.id, label: `${l.titulo} (${l.autor})` })))
    );
    adminPessoasService.listar().then((pessoas) =>
      setPessoaOptions(pessoas.map((p) => ({ value: p.id, label: p.nome })))
    );
  }, []);

  function set<K extends keyof VendaCreate>(key: K, value: VendaCreate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
      showToast("Venda registrada com sucesso!");
    } catch {
      setError("Erro ao registrar venda. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.livro}</label>
        <Combobox
          options={livroOptions}
          value={form.livro_id || null}
          onChange={(id) => set("livro_id", (id as number) ?? 0)}
          placeholder="Buscar livro..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.comprador}</label>
        <Combobox
          options={pessoaOptions}
          value={form.comprador_id || null}
          onChange={(id) => set("comprador_id", (id as number) ?? 0)}
          placeholder="Buscar comprador..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.preco}</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={form.preco_venda || ""}
          onChange={(e) => set("preco_venda", parseFloat(e.target.value) || 0)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.comissao}</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={form.taxa_comissao || ""}
          onChange={(e) => set("taxa_comissao", parseFloat(e.target.value) || 0)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.entrega}</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={form.taxa_entrega ?? ""}
          onChange={(e) => set("taxa_entrega", e.target.value ? parseFloat(e.target.value) : undefined)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.pagamento}</label>
        <Select
          value={form.forma_pagamento}
          onChange={(e) => set("forma_pagamento", e.target.value)}
          options={pagamentoOptions}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.observacoes}</label>
        <Textarea
          value={form.observacoes ?? ""}
          onChange={(e) => set("observacoes", e.target.value || undefined)}
        />
      </div>

      {error && <p className="text-sm text-warning-600">{error}</p>}

      <Button type="submit" loading={loading}>
        {loading ? salvando : salvar}
      </Button>
    </form>
  );
}
