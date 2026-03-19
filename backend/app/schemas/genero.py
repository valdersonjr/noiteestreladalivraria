from pydantic import BaseModel, ConfigDict


class GeneroSchema(BaseModel):
    id: int
    nome: str
    slug: str

    model_config = ConfigDict(from_attributes=True)
