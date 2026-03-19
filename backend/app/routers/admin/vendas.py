from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_usuario_atual
from app.database import get_db
from app.schemas.venda import VendaCreate, VendaSchema
from app.services.admin import vendas as vendas_service

router = APIRouter(prefix="/admin/vendas", tags=["admin - vendas"])


@router.post("", response_model=VendaSchema, status_code=201)
async def criar_venda(
    data: VendaCreate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await vendas_service.criar(db, data)


@router.get("", response_model=list[VendaSchema])
async def listar_vendas(
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await vendas_service.listar(db)


@router.patch("/{venda_id}/status", response_model=VendaSchema)
async def atualizar_status(
    venda_id: int,
    status: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await vendas_service.atualizar_status(db, venda_id, status)


@router.patch("/{venda_id}/repasse", response_model=VendaSchema)
async def atualizar_repasse(
    venda_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_usuario_atual),
):
    return await vendas_service.atualizar_repasse(db, venda_id)
