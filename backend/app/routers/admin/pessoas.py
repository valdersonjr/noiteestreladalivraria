from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_usuario_atual
from app.database import get_db
from app.schemas.pessoa import PessoaCreate, PessoaSchema
from app.services.admin import pessoas as pessoas_service

router = APIRouter(prefix="/admin/pessoas", tags=["admin - pessoas"])


@router.post("", response_model=PessoaSchema, status_code=201)
async def criar_pessoa(
    data: PessoaCreate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await pessoas_service.criar(db, data)


@router.get("", response_model=list[PessoaSchema])
async def listar_pessoas(
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await pessoas_service.listar(db)


@router.get("/{pessoa_id}", response_model=PessoaSchema)
async def buscar_pessoa(
    pessoa_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await pessoas_service.buscar(db, pessoa_id)


@router.put("/{pessoa_id}", response_model=PessoaSchema)
async def atualizar_pessoa(
    pessoa_id: int,
    data: PessoaCreate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await pessoas_service.atualizar(db, pessoa_id, data)


@router.delete("/{pessoa_id}", status_code=204)
async def remover_pessoa(
    pessoa_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    await pessoas_service.deletar(db, pessoa_id)
