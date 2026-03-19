from datetime import datetime

from pydantic import BaseModel, ConfigDict


class VendaCreate(BaseModel):
    livro_id: int
    comprador_id: int
    preco_venda: float
    taxa_comissao: float = 10.00
    taxa_entrega: float | None = None
    forma_pagamento: str
    observacoes: str | None = None


class VendaSchema(BaseModel):
    id: int
    livro_id: int | None
    livro_titulo: str
    livro_autor: str
    comprador_id: int | None
    comprador_nome: str
    preco_compra_snapshot: float | None
    lucro: float
    preco_venda: float
    taxa_comissao: float
    valor_comissao: float
    taxa_entrega: float | None
    forma_pagamento: str
    status: str
    repasse_realizado: bool
    repasse_em: datetime | None
    observacoes: str | None
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)
