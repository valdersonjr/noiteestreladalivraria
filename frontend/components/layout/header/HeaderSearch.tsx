"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { strings } from "@/lib/strings";
import { livrosService } from "@/services/livros";
import type { Livro } from "@/types/livro";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Livro[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Busca com debounce */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await livrosService.listar({ q: query.trim() });
        setResults(res.items.slice(0, 6));
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  /* Fechar ao clicar fora */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect() {
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder={strings.header.searchPlaceholder}
        rightIcon={
          <Button
            variant="ghost"
            size="sm"
            aria-label="Buscar"
            className="text-muted hover:text-primary-600 -mr-2"
          >
            {loading ? (
              <span className="w-[17px] h-[17px] border-2 border-muted border-t-primary-500 rounded-full animate-spin block" />
            ) : query.length >= 2 && !open ? (
              <span className="w-2 h-2 rounded-full bg-primary-400 block" />
            ) : (
              <Search size={17} />
            )}
          </Button>
        }
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
          {loading && (
            <div className="px-4 py-3 text-sm text-muted">Buscando...</div>
          )}

          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted">
              Nenhum livro encontrado para "{query}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul>
              {results.map((livro) => (
                <li key={livro.id}>
                  <Link
                    href={`/livros/${livro.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary-50 dark:hover:bg-primary-950/60 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="shrink-0 w-10 h-13 rounded overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      {livro.foto ? (
                        <img
                          src={livro.foto}
                          alt={livro.titulo}
                          className="w-full h-full object-cover"
                          style={{ height: 52 }}
                        />
                      ) : (
                        <BookOpen size={16} className="text-muted" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {livro.titulo}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-xs text-muted truncate">{livro.autor}</p>
                        <span
                          className={[
                            "shrink-0 text-[10px] font-semibold px-1.5 py-px rounded-full",
                            livro.condicao === "novo"
                              ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
                          ].join(" ")}
                        >
                          {livro.condicao === "novo" ? "Novo" : "Usado"}
                        </span>
                      </div>
                    </div>

                    {/* Preço */}
                    <div className="ml-2 shrink-0 text-right">
                      {livro.preco_oferta != null ? (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-muted line-through leading-none">
                            R$ {livro.preco.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-xs font-bold text-red-600 dark:text-red-400">
                            R$ {livro.preco_oferta.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                          R$ {livro.preco.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
