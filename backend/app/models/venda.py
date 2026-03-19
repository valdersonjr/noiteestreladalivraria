from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey, Numeric, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Venda(Base):
    __tablename__ = "vendas"

    id: Mapped[int] = mapped_column(primary_key=True)

    # FKs nullable — SET NULL ao deletar livro/pessoa (snapshot preserva os dados)
    livro_id: Mapped[int | None] = mapped_column(ForeignKey("livros.id", ondelete="SET NULL"), nullable=True)
    comprador_id: Mapped[int | None] = mapped_column(ForeignKey("pessoas.id", ondelete="SET NULL"), nullable=True)

    # Snapshot — dados gravados no momento da venda
    livro_titulo: Mapped[str] = mapped_column(String(255))
    livro_autor: Mapped[str] = mapped_column(String(255))
    comprador_nome: Mapped[str] = mapped_column(String(255))
    preco_compra_snapshot: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    lucro: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    preco_venda: Mapped[float] = mapped_column(Numeric(10, 2))
    taxa_comissao: Mapped[float] = mapped_column(Numeric(5, 2), default=10.00)
    valor_comissao: Mapped[float] = mapped_column(Numeric(10, 2))
    taxa_entrega: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    forma_pagamento: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(20), default="pendente")
    repasse_realizado: Mapped[bool] = mapped_column(Boolean, default=False)
    repasse_em: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    observacoes: Mapped[str | None] = mapped_column(Text, nullable=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    livro: Mapped["Livro | None"] = relationship(back_populates="vendas", passive_deletes=True)  # noqa: F821
    comprador: Mapped["Pessoa | None"] = relationship(back_populates="compras", passive_deletes=True)  # noqa: F821
