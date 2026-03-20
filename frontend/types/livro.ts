export type Condicao = "novo" | "usado";

export interface Genero {
  id: number;
  nome: string;
  slug: string;
}

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  slug: string;
  preco: number;
  preco_oferta: number | null;
  preco_compra: number | null;
  condicao: Condicao;
  descricao: string;
  foto: string;
  generos: Genero[];
  disponivel: boolean;
  criado_em: string;
}

export interface LivroCreate {
  titulo: string;
  autor: string;
  preco: number;
  preco_oferta: number | null;
  preco_compra: number | null;
  condicao: Condicao;
  descricao: string;
  foto: string;
  genero_ids: number[];
  vendedor_id: number | null;
}

export interface LivroUpdate extends LivroCreate {}

export interface DisponibilidadeUpdate {
  disponivel: boolean;
}

export interface LivrosFiltros {
  q?: string;
  condicao?: Condicao;
  genero?: string;
  preco_min?: number;
  preco_max?: number;
  ordenar?: "preco_asc" | "preco_desc" | "recente";
  apenas_ofertas?: boolean;
}

export interface LivrosResposta {
  items: Livro[];
  total: number;
}
