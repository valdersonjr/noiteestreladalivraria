import Link from "next/link";
import { Livro } from "@/types/livro";
import { BookCard } from "./BookCard";

interface BookSectionProps {
  title: string;
  subtitle?: string;
  livros: Livro[];
  verTodosHref: string;
  loading?: boolean;
  total?: number;
}

const SKELETON_COUNT = 6;

export function BookSection({
  title,
  subtitle,
  livros,
  verTodosHref,
  loading = false,
  total,
}: BookSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted mt-0.5">
              {subtitle}
              {total != null && total > 0 && (
                <span className="ml-1.5 text-xs font-semibold text-primary-500">
                  · {total} livro{total !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          )}
        </div>
        <Link
          href={verTodosHref}
          className="shrink-0 text-sm text-primary-500 hover:text-primary-600 hover:underline"
        >
          Ver todos →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse aspect-[3/4]"
            />
          ))}
        </div>
      ) : livros.length === 0 ? (
        <p className="text-sm text-muted py-8 text-center">
          Nenhum livro disponível no momento.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {livros.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </div>
      )}
    </section>
  );
}
