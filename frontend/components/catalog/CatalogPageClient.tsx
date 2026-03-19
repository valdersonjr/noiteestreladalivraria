"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BookCard } from "./BookCard";
import { livrosService } from "@/services/livros";
import { Condicao, Genero, Livro, LivrosFiltros } from "@/types/livro";

interface CatalogPageClientProps {
  title: string;
  subtitle: string;
  condicao?: Condicao;
  defaultOrdenar?: LivrosFiltros["ordenar"];
}

const SORT_OPTIONS: { value: NonNullable<LivrosFiltros["ordenar"]>; label: string }[] = [
  { value: "recente", label: "Mais recentes" },
  { value: "preco_asc", label: "Menor preço" },
  { value: "preco_desc", label: "Maior preço" },
];

const SKELETON_COUNT = 12;

export function CatalogPageClient({
  title,
  subtitle,
  condicao,
  defaultOrdenar = "recente",
}: CatalogPageClientProps) {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [genero, setGenero] = useState("");
  const [ordenar, setOrdenar] = useState<LivrosFiltros["ordenar"]>(defaultOrdenar);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    livrosService.listarGeneros().then(setGeneros);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      livrosService
        .listar({
          condicao,
          q: q || undefined,
          genero: genero || undefined,
          ordenar,
        })
        .then((res) => setLivros(res.items))
        .finally(() => setLoading(false));
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q, genero, ordenar, condicao]);

  const generoOptions = [
    { value: "", label: "Todos os gêneros" },
    ...generos.map((g) => ({ value: g.slug, label: g.nome })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted mt-1">{subtitle}</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-52">
          <Input
            placeholder="Buscar por título ou autor..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            leftIcon={<Search size={15} />}
          />
        </div>
        <Select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          options={generoOptions}
          className="w-48"
        />
        <Select
          value={ordenar ?? "recente"}
          onChange={(e) =>
            setOrdenar(e.target.value as LivrosFiltros["ordenar"])
          }
          options={SORT_OPTIONS}
          className="w-44"
        />
      </div>

      {/* Contagem */}
      {!loading && (
        <p className="text-xs text-muted">
          {livros.length} livro{livros.length !== 1 ? "s" : ""} encontrado
          {livros.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse aspect-[3/4]"
            />
          ))}
        </div>
      ) : livros.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <span className="text-5xl">📚</span>
          <p className="text-muted">Nenhum livro encontrado.</p>
          {(q || genero) && (
            <button
              onClick={() => {
                setQ("");
                setGenero("");
              }}
              className="text-sm text-primary-500 hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
      )}
    </div>
  );
}
