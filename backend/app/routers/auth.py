from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verificar_senha, criar_token
from app.database import get_db
from app.models.usuario import Usuario
from app.models.pessoa import Pessoa
from app.schemas.usuario import LoginInput, TokenSchema

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenSchema)
async def login(payload: LoginInput, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Usuario)
        .join(Pessoa, Usuario.pessoa_id == Pessoa.id)
        .where(Pessoa.telefone == payload.telefone)
    )
    usuario = result.scalar_one_or_none()

    if not usuario or not verificar_senha(payload.senha, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Telefone ou senha incorretos",
        )

    token = criar_token({"sub": str(usuario.id)})
    return {"access_token": token}
