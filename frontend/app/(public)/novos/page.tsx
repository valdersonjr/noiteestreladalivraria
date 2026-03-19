import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";

export default function LivrosNovosPage() {
  return (
    <CatalogPageClient
      title="Livros Novos"
      subtitle="Exemplares em perfeito estado, direto pra você."
      condicao="novo"
      defaultOrdenar="recente"
    />
  );
}
