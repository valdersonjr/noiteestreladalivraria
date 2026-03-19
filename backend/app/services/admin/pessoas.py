from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.pessoa import Pessoa
from app.schemas.pessoa import PessoaCreate


async def criar(db: AsyncSession, data: PessoaCreate) -> Pessoa:
    existing = await db.execute(select(Pessoa).where(Pessoa.telefone == data.telefone))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Telefone já cadastrado")

    pessoa = Pessoa(**data.model_dump())
    db.add(pessoa)
    await db.commit()
    await db.refresh(pessoa)
    return pessoa


async def listar(db: AsyncSession) -> list[Pessoa]:
    result = await db.execute(select(Pessoa).order_by(Pessoa.nome))
    return result.scalars().all()


async def buscar(db: AsyncSession, pessoa_id: int) -> Pessoa:
    result = await db.execute(select(Pessoa).where(Pessoa.id == pessoa_id))
    pessoa = result.scalar_one_or_none()
    if not pessoa:
        raise HTTPException(status_code=404, detail="Pessoa não encontrada")
    return pessoa


async def atualizar(db: AsyncSession, pessoa_id: int, data: PessoaCreate) -> Pessoa:
    pessoa = await buscar(db, pessoa_id)

    if data.telefone != pessoa.telefone:
        existing = await db.execute(select(Pessoa).where(Pessoa.telefone == data.telefone))
        if existing.scalar_one_or_none():
            raise HTTPException(status_code=409, detail="Telefone já cadastrado")

    for campo, valor in data.model_dump().items():
        setattr(pessoa, campo, valor)

    await db.commit()
    await db.refresh(pessoa)
    return pessoa


async def deletar(db: AsyncSession, pessoa_id: int) -> None:
    pessoa = await buscar(db, pessoa_id)
    await db.delete(pessoa)
    await db.commit()
