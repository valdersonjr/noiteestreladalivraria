"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/auth";
import { strings } from "@/lib/strings";

const { title, subtitle, telefone, senha, submit, loading: loadingLabel, error: errorLabel } = strings.admin.login;

export default function AdminLoginPage() {
  const router = useRouter();
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await authService.login(tel, pass);
      router.replace("/admin");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-surface border border-border rounded-xl p-8 shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/noite-estrelada-logo.png"
            alt="Noite Estrelada"
            width={140}
            height={140}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted mt-1">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{telefone}</label>
            <Input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{senha}</label>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-warning-600">{errorLabel}</p>}

          <Button type="submit" loading={loading} className="w-full">
            {loading ? loadingLabel : submit}
          </Button>
        </form>
      </div>
    </div>
  );
}
