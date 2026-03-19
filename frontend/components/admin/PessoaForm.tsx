"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { strings } from "@/lib/strings";
import { PessoaCreate } from "@/types/pessoa";
import { useToast } from "@/context/ToastContext";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

const { campos, salvar, salvando } = strings.admin.pessoas;

interface PessoaFormProps {
  defaultValues?: Partial<PessoaCreate>;
  onSubmit: (data: PessoaCreate) => Promise<void>;
}

export function PessoaForm({ defaultValues = {}, onSubmit }: PessoaFormProps) {
  const { showToast } = useToast();

  const initial: PessoaCreate = {
    nome: defaultValues.nome ?? "",
    telefone: defaultValues.telefone ?? "",
    email: defaultValues.email ?? "",
  };

  const [form, setForm] = useState<PessoaCreate>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initial),
    [form] // eslint-disable-line react-hooks/exhaustive-deps
  );
  useUnsavedChanges(isDirty);

  function set<K extends keyof PessoaCreate>(key: K, value: PessoaCreate[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ ...form, email: form.email || undefined });
      showToast("Pessoa salva com sucesso!");
    } catch {
      setError("Erro ao salvar pessoa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.nome}</label>
        <Input value={form.nome} onChange={(e) => set("nome", e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.telefone}</label>
        <Input value={form.telefone} onChange={(e) => set("telefone", e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">{campos.email}</label>
        <Input type="email" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} />
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
