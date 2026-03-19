from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.genero import GeneroSchema
from app.schemas.livro import LivroSchema, LivrosResposta
from app.services import livros as livros_service

router = APIRouter(prefix="/livros", tags=["livros"])


@router.get("/generos", response_model=list[GeneroSchema])
async def listar_generos(db: AsyncSession = Depends(get_db)):
    return await livros_service.listar_generos(db)


@router.get("", response_model=LivrosResposta)
async def listar_livros(
    q: str | None = None,
    condicao: str | None = None,
    genero: str | None = None,
    preco_min: float | None = None,
    preco_max: float | None = None,
    ordenar: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    return await livros_service.listar(db, q, condicao, genero, preco_min, preco_max, ordenar)


@router.get("/{slug}", response_model=LivroSchema)
async def buscar_por_slug(slug: str, db: AsyncSession = Depends(get_db)):
    livro = await livros_service.buscar_por_slug(db, slug)
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return livro
