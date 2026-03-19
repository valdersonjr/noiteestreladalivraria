import { apiAuth } from "../api";
import { Pessoa, PessoaCreate } from "@/types/pessoa";

const BASE = "/admin/pessoas";

export const adminPessoasService = {
  criar: (data: PessoaCreate) => apiAuth.post<Pessoa>(BASE, data),

  listar: () => apiAuth.get<Pessoa[]>(BASE),

  buscarPorId: (id: number) => apiAuth.get<Pessoa>(`${BASE}/${id}`),

  atualizar: (id: number, data: PessoaCreate) => apiAuth.put<Pessoa>(`${BASE}/${id}`, data),

  deletar: (id: number) => apiAuth.delete<void>(`${BASE}/${id}`),
};
