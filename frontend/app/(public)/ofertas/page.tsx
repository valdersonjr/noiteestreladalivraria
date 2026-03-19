import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";

export default function OfertasPage() {
  return (
    <CatalogPageClient
      title="✨ Ofertas"
      subtitle="Os melhores preços da livraria, em livros novos e usados."
      defaultOrdenar="preco_asc"
    />
  );
}
