from datetime import datetime

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Pessoa(Base):
    __tablename__ = "pessoas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(255))
    telefone: Mapped[str] = mapped_column(String(20), unique=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    usuario: Mapped["Usuario"] = relationship(back_populates="pessoa", uselist=False)  # noqa: F821
    livros_vendidos: Mapped[list["Livro"]] = relationship(back_populates="vendedor")  # noqa: F821
    compras: Mapped[list["Venda"]] = relationship(back_populates="comprador", passive_deletes=True)  # noqa: F821
