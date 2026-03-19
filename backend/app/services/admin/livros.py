from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from fastapi import HTTPException

from app.models.livro import Livro
from app.models.genero import Genero
from app.schemas.livro import LivroCreate, LivroUpdate, DisponibilidadeUpdate
from app.utils.slugify import slugify


async def _buscar_generos(db: AsyncSession, ids: list[int]) -> list[Genero]:
    result = await db.execute(select(Genero).where(Genero.id.in_(ids)))
    return result.scalars().all()


async def _buscar_livro(db: AsyncSession, slug: str) -> Livro:
    result = await db.execute(
        select(Livro).where(Livro.slug == slug).options(selectinload(Livro.generos))
    )
    livro = result.scalar_one_or_none()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return livro


async def criar(db: AsyncSession, data: LivroCreate) -> Livro:
    slug = slugify(f"{data.titulo} {data.autor}")

    existing = await db.execute(select(Livro).where(Livro.slug == slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Livro já cadastrado")

    generos = await _buscar_generos(db, data.genero_ids)

    livro = Livro(
        titulo=data.titulo,
        autor=data.autor,
        slug=slug,
        preco=data.preco,
        preco_compra=data.preco_compra,
        condicao=data.condicao,
        descricao=data.descricao,
        foto=data.foto,
        vendedor_id=data.vendedor_id,
        generos=generos,
    )
    db.add(livro)
    await db.commit()
    return await _buscar_livro(db, livro.slug)


async def atualizar(db: AsyncSession, slug: str, data: LivroUpdate) -> Livro:
    livro = await _buscar_livro(db, slug)

    for campo, valor in data.model_dump(exclude_none=True, exclude={"genero_ids"}).items():
        setattr(livro, campo, valor)

    if data.genero_ids is not None:
        livro.generos = await _buscar_generos(db, data.genero_ids)

    livro.atualizado_em = datetime.utcnow()
    await db.commit()
    return await _buscar_livro(db, livro.slug)


async def atualizar_disponibilidade(db: AsyncSession, slug: str, data: DisponibilidadeUpdate) -> Livro:
    livro = await _buscar_livro(db, slug)
    livro.disponivel = data.disponivel
    livro.atualizado_em = datetime.utcnow()
    await db.commit()
    return await _buscar_livro(db, livro.slug)


async def remover(db: AsyncSession, slug: str) -> None:
    livro = await _buscar_livro(db, slug)
    await db.delete(livro)
    await db.commit()
