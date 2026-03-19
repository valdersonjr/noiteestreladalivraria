import { api } from "./api";
import { buildQueryString } from "@/utils/buildQueryString";
import type { Genero, Livro, LivrosFiltros, LivrosResposta } from "@/types/livro";

const BASE = "/livros";

export const livrosService = {
  listar: (filtros: LivrosFiltros = {}) =>
    api.get<LivrosResposta>(`${BASE}${buildQueryString(filtros)}`),

  buscarPorSlug: (slug: string) =>
    api.get<Livro>(`${BASE}/${slug}`),

  listarGeneros: () =>
    api.get<Genero[]>(`${BASE}/generos`),
};
