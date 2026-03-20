from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.genero import GeneroSchema


class LivroCreate(BaseModel):
    titulo: str
    autor: str
    preco: float
    preco_oferta: float | None = None
    preco_compra: float | None = None
    condicao: str
    descricao: str
    foto: str
    vendedor_id: int | None = None
    genero_ids: list[int] = []


class LivroUpdate(BaseModel):
    titulo: str | None = None
    autor: str | None = None
    preco: float | None = None
    preco_oferta: float | None = None
    preco_compra: float | None = None
    condicao: str | None = None
    descricao: str | None = None
    foto: str | None = None
    vendedor_id: int | None = None
    genero_ids: list[int] | None = None


class DisponibilidadeUpdate(BaseModel):
    disponivel: bool


class LivroSchema(BaseModel):
    id: int
    titulo: str
    autor: str
    slug: str
    preco: float
    preco_oferta: float | None
    preco_compra: float | None
    condicao: str
    descricao: str
    foto: str
    disponivel: bool
    generos: list[GeneroSchema]
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)


class LivrosResposta(BaseModel):
    items: list[LivroSchema]
    total: int
