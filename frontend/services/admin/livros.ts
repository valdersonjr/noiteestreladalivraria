import { apiAuth } from "../api";
import { Livro, LivroCreate, LivroUpdate, DisponibilidadeUpdate } from "@/types/livro";

const BASE = "/admin/livros";

export const adminLivrosService = {
  criar: (data: LivroCreate) => apiAuth.post<Livro>(BASE, data),

  atualizar: (slug: string, data: LivroUpdate) => apiAuth.put<Livro>(`${BASE}/${slug}`, data),

  atualizarDisponibilidade: (slug: string, data: DisponibilidadeUpdate) =>
    apiAuth.patch<Livro>(`${BASE}/${slug}/disponibilidade`, data),

  deletar: (slug: string) => apiAuth.delete<void>(`${BASE}/${slug}`),
};
