"""
Cria todas as tabelas no banco de dados caso não existam.
Equivalente ao `alembic upgrade head`, mas sem precisar de arquivos de migration.
"""
import asyncio

from app.database import engine, Base
import app.models.livro  # noqa: F401
import app.models.genero  # noqa: F401
import app.models.pessoa  # noqa: F401
import app.models.usuario  # noqa: F401
import app.models.venda  # noqa: F401


async def create():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("[db] Tabelas criadas/verificadas com sucesso.")


if __name__ == "__main__":
    asyncio.run(create())
