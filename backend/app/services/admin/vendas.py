from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.venda import Venda
from app.models.livro import Livro
from app.models.pessoa import Pessoa
from app.schemas.venda import VendaCreate


async def _buscar_venda(db: AsyncSession, venda_id: int) -> Venda:
    result = await db.execute(select(Venda).where(Venda.id == venda_id))
    venda = result.scalar_one_or_none()
    if not venda:
        raise HTTPException(status_code=404, detail="Venda não encontrada")
    return venda


async def criar(db: AsyncSession, data: VendaCreate) -> Venda:
    livro_result = await db.execute(select(Livro).where(Livro.id == data.livro_id))
    livro = livro_result.scalar_one_or_none()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    if not livro.disponivel:
        raise HTTPException(status_code=409, detail="Livro não está disponível")

    comprador_result = await db.execute(select(Pessoa).where(Pessoa.id == data.comprador_id))
    comprador = comprador_result.scalar_one_or_none()
    if not comprador:
        raise HTTPException(status_code=404, detail="Comprador não encontrado")

    valor_comissao = round(data.preco_venda * data.taxa_comissao / 100, 2)
    entrega = data.taxa_entrega or 0

    if livro.preco_compra is not None:
        # Livro próprio: lucro = venda - compra + entrega
        lucro = round(data.preco_venda - float(livro.preco_compra) + entrega, 2)
    else:
        # Consignação: lucro = comissão + entrega
        lucro = round(valor_comissao + entrega, 2)

    venda = Venda(
        livro_id=data.livro_id,
        comprador_id=data.comprador_id,
        livro_titulo=livro.titulo,
        livro_autor=livro.autor,
        comprador_nome=comprador.nome,
        preco_compra_snapshot=livro.preco_compra,
        lucro=lucro,
        preco_venda=data.preco_venda,
        taxa_comissao=data.taxa_comissao,
        valor_comissao=valor_comissao,
        taxa_entrega=data.taxa_entrega,
        forma_pagamento=data.forma_pagamento,
        observacoes=data.observacoes,
    )
    db.add(venda)

    livro.disponivel = False
    livro.atualizado_em = datetime.utcnow()

    await db.commit()
    return await _buscar_venda(db, venda.id)


async def listar(db: AsyncSession) -> list[Venda]:
    result = await db.execute(select(Venda).order_by(Venda.criado_em.desc()))
    return result.scalars().all()


async def atualizar_status(db: AsyncSession, venda_id: int, status: str) -> Venda:
    venda = await _buscar_venda(db, venda_id)
    venda.status = status

    if status == "cancelada" and venda.livro_id:
        livro_result = await db.execute(select(Livro).where(Livro.id == venda.livro_id))
        livro = livro_result.scalar_one_or_none()
        if livro:
            livro.disponivel = True
            livro.atualizado_em = datetime.utcnow()

    await db.commit()
    return await _buscar_venda(db, venda_id)


async def atualizar_repasse(db: AsyncSession, venda_id: int) -> Venda:
    venda = await _buscar_venda(db, venda_id)
    venda.repasse_realizado = True
    venda.repasse_em = datetime.utcnow()
    await db.commit()
    return await _buscar_venda(db, venda_id)
