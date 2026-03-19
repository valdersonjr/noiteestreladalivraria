"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import { MultiCombobox } from "@/components/ui/MultiCombobox";
import { strings } from "@/lib/strings";
import { LivroCreate } from "@/types/livro";
import { livrosService } from "@/services/livros";
import { adminPessoasService } from "@/services/admin/pessoas";
import { useToast } from "@/context/ToastContext";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

const { campos, salvar, salvando } = strings.admin.livros;

interface LivroFormProps {
  defaultValues?: Partial<LivroCreate>;
  onSubmit: (data: LivroCreate) => Promise<void>;
}

export function LivroForm({ defaultValues = {}, onSubmit }: LivroFormProps) {
  const { showToast } = useToast();

  const initial: LivroCreate = {
    titulo: defaultValues.titulo ?? "",
    autor: defaultValues.autor ?? "",
    preco: defaultValues.preco ?? 0,
    preco_compra: defaultValues.preco_compra ?? null,
    condicao: defaultValues.condicao ?? "novo",
    descricao: defaultValues.descricao ?? "",
    foto: defaultValues.foto ?? "",
    genero_ids: defaultValues.genero_ids ?? [],
    vendedor_id: defaultValues.vendedor_id ?? null,
  };

  const [form, setForm] = useState<LivroCreate>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initial),
    [form] // eslint-disable-line react-hooks/exhaustive-deps
  );
  useUnsavedChanges(isDirty);

  const [generoOptions, setGeneroOptions] = useState<{ value: number; label: string }[]>([]);
  const [pessoaOptions, setPessoaOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    livrosService.listarGeneros().then((generos) =>
      setGeneroOptions(generos.map((g) => ({ value: g.id, label: g.nome })))
    );
    adminPessoasService.listar().then((pessoas) =>
      setPessoaOptions(pessoas.map((p) => ({ value: p.id, label: `${p.nome} (${p.telefone})` })))
    );
  }, []);

  function set<K extends keyof LivroCreate>(key: K, value: LivroCreate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(form);
      showToast("Livro salvo com sucesso!");
    } catch {
      setError("Erro ao salvar livro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.titulo}</label>
        <Input value={form.titulo} onChange={(e) => set("titulo", e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.autor}</label>
        <Input value={form.autor} onChange={(e) => set("autor", e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.preco}</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={form.preco || ""}
          onChange={(e) => set("preco", parseFloat(e.target.value) || 0)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {campos.precoCompra}
          <span className="ml-2 text-xs font-normal text-muted">{campos.precoCompraHint}</span>
        </label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={form.preco_compra ?? ""}
          onChange={(e) => set("preco_compra", e.target.value ? parseFloat(e.target.value) : null)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.condicao}</label>
        <Select
          value={form.condicao}
          onChange={(e) => set("condicao", e.target.value as "novo" | "usado")}
          options={[
            { value: "novo", label: campos.novo },
            { value: "usado", label: campos.usado },
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.descricao}</label>
        <Textarea
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.foto}</label>
        <Input value={form.foto} onChange={(e) => set("foto", e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.generos}</label>
        <MultiCombobox
          options={generoOptions}
          value={form.genero_ids}
          onChange={(ids) => set("genero_ids", ids as number[])}
          placeholder="Buscar gênero..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.vendedor}</label>
        <Combobox
          options={pessoaOptions}
          value={form.vendedor_id}
          onChange={(id) => set("vendedor_id", id as number | null)}
          placeholder="Buscar vendedor..."
        />
      </div>

      {error && <p className="text-sm text-warning-600">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={loading}>
          {loading ? salvando : salvar}
        </Button>
        {isDirty && !loading && (
          <span className="text-xs text-muted">Alterações não salvas</span>
        )}
      </div>
    </form>
  );
}
