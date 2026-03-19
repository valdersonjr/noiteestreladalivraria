import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";

export default function LivrosUsadosPage() {
  return (
    <CatalogPageClient
      title="Livros Usados"
      subtitle="Histórias com vida própria, a preços que cabem no bolso."
      condicao="usado"
      defaultOrdenar="recente"
    />
  );
}
