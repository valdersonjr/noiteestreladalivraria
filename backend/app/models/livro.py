from datetime import datetime

from sqlalchemy import String, Text, Numeric, Boolean, DateTime, Table, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


livro_genero = Table(
    "livro_genero",
    Base.metadata,
    Column("livro_id", ForeignKey("livros.id", ondelete="CASCADE"), primary_key=True),
    Column("genero_id", ForeignKey("generos.id"), primary_key=True),
)


class Livro(Base):
    __tablename__ = "livros"

    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str] = mapped_column(String(255))
    autor: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    preco: Mapped[float] = mapped_column(Numeric(10, 2))
    preco_compra: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    condicao: Mapped[str] = mapped_column(String(10))
    descricao: Mapped[str] = mapped_column(Text)
    foto: Mapped[str] = mapped_column(String(500))
    disponivel: Mapped[bool] = mapped_column(Boolean, default=True)
    vendedor_id: Mapped[int | None] = mapped_column(ForeignKey("pessoas.id"), nullable=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    atualizado_em: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    generos: Mapped[list["Genero"]] = relationship(secondary=livro_genero, back_populates="livros")  # noqa: F821
    vendedor: Mapped["Pessoa | None"] = relationship(back_populates="livros_vendidos")  # noqa: F821
    vendas: Mapped[list["Venda"]] = relationship(back_populates="livro", passive_deletes=True)  # noqa: F821
