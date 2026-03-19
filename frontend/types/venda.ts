export type VendaStatus = "pendente" | "concluida" | "cancelada";
export type FormaPagamento = "pix" | "dinheiro";

export interface Venda {
  id: number;
  livro_id: number | null;
  livro_titulo: string;
  livro_autor: string;
  comprador_id: number | null;
  comprador_nome: string;
  preco_compra_snapshot: number | null;
  lucro: number;
  preco_venda: number;
  taxa_comissao: number;
  valor_comissao: number;
  taxa_entrega: number | null;
  forma_pagamento: string;
  status: VendaStatus;
  repasse_realizado: boolean;
  repasse_em: string | null;
  observacoes: string | null;
  criado_em: string;
}

export interface VendaCreate {
  livro_id: number;
  comprador_id: number;
  preco_venda: number;
  taxa_comissao: number;
  taxa_entrega?: number;
  forma_pagamento: string;
  observacoes?: string;
}
