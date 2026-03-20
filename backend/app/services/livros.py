from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.livro import Livro
from app.models.genero import Genero


async def listar(
    db: AsyncSession,
    q: str | None,
    condicao: str | None,
    genero: str | None,
    preco_min: float | None,
    preco_max: float | None,
    ordenar: str | None,
    apenas_ofertas: bool | None = None,
) -> dict:
    query = select(Livro).where(Livro.disponivel == True).options(selectinload(Livro.generos))  # noqa: E712

    if apenas_ofertas:
        query = query.where(Livro.preco_oferta.isnot(None))
    if q:
        query = query.where(or_(Livro.titulo.ilike(f"%{q}%"), Livro.autor.ilike(f"%{q}%")))
    if condicao:
        query = query.where(Livro.condicao == condicao)
    if genero:
        query = query.join(Livro.generos).where(Genero.slug == genero)
    if preco_min is not None:
        query = query.where(Livro.preco >= preco_min)
    if preco_max is not None:
        query = query.where(Livro.preco <= preco_max)

    if ordenar == "preco_asc":
        query = query.order_by(Livro.preco.asc())
    elif ordenar == "preco_desc":
        query = query.order_by(Livro.preco.desc())
    else:
        query = query.order_by(Livro.criado_em.desc())

    total_query = select(func.count()).select_from(query.subquery())
    total = await db.scalar(total_query)

    result = await db.execute(query)
    items = result.scalars().all()

    return {"items": items, "total": total}


async def buscar_por_slug(db: AsyncSession, slug: str) -> Livro | None:
    result = await db.execute(
        select(Livro).where(Livro.slug == slug).options(selectinload(Livro.generos))
    )
    return result.scalar_one_or_none()


async def listar_generos(db: AsyncSession) -> list[Genero]:
    result = await db.execute(select(Genero).order_by(Genero.nome))
    return result.scalars().all()
