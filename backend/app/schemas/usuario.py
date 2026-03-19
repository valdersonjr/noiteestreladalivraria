from pydantic import BaseModel


class LoginInput(BaseModel):
    telefone: str
    senha: str


class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
