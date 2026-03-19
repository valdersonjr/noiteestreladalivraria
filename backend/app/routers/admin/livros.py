from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_usuario_atual
from app.database import get_db
from app.schemas.livro import LivroSchema, LivroCreate, LivroUpdate, DisponibilidadeUpdate
from app.services.admin import livros as livros_service

router = APIRouter(prefix="/admin/livros", tags=["admin - livros"])


@router.post("", response_model=LivroSchema, status_code=201)
async def criar_livro(
    data: LivroCreate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await livros_service.criar(db, data)


@router.put("/{slug}", response_model=LivroSchema)
async def atualizar_livro(
    slug: str,
    data: LivroUpdate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await livros_service.atualizar(db, slug, data)


@router.patch("/{slug}/disponibilidade", response_model=LivroSchema)
async def atualizar_disponibilidade(
    slug: str,
    data: DisponibilidadeUpdate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await livros_service.atualizar_disponibilidade(db, slug, data)


@router.delete("/{slug}", status_code=204)
async def remover_livro(
    slug: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    await livros_service.remover(db, slug)
