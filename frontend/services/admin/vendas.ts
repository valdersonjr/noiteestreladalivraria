import { apiAuth } from "../api";
import { Venda, VendaCreate } from "@/types/venda";

const BASE = "/admin/vendas";

export const adminVendasService = {
  criar: (data: VendaCreate) => apiAuth.post<Venda>(BASE, data),

  listar: () => apiAuth.get<Venda[]>(BASE),

  atualizarStatus: (id: number, status: string) =>
    apiAuth.patch<Venda>(`${BASE}/${id}/status?status=${status}`),

  registrarRepasse: (id: number) => apiAuth.patch<Venda>(`${BASE}/${id}/repasse`),
};
