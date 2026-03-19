from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PessoaCreate(BaseModel):
    nome: str
    telefone: str
    email: str | None = None


class PessoaSchema(BaseModel):
    id: int
    nome: str
    telefone: str
    email: str | None
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)
