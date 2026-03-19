"""
Script de seed: cria admin e gêneros caso não existam.
Executado automaticamente pelo Dockerfile após create_tables.
"""
import asyncio

from sqlalchemy import select

from app.database import AsyncSessionLocal
from app.models.pessoa import Pessoa
from app.models.usuario import Usuario
from app.models.genero import Genero
from app.models.livro import Livro  # noqa: F401
from app.models.venda import Venda  # noqa: F401
from app.core.config import settings
from app.core.security import hash_senha

ADMIN_TELEFONE = "62984818938"
ADMIN_NOME = "Lara (Eu)"

GENEROS = [
    ("Romance", "romance"),
    ("Ficção Científica", "ficcao-cientifica"),
    ("Fantasia", "fantasia"),
    ("Terror", "terror"),
    ("Suspense", "suspense"),
    ("Mistério", "misterio"),
    ("Aventura", "aventura"),
    ("Biografia", "biografia"),
    ("História", "historia"),
    ("Autoajuda", "autoajuda"),
    ("Filosofia", "filosofia"),
    ("Psicologia", "psicologia"),
    ("Ciência", "ciencia"),
    ("Tecnologia", "tecnologia"),
    ("Infantil", "infantil"),
    ("Jovem Adulto", "jovem-adulto"),
    ("Poesia", "poesia"),
    ("Conto", "conto"),
    ("Drama", "drama"),
    ("Humor", "humor"),
    ("Política", "politica"),
    ("Economia", "economia"),
    ("Religião", "religiao"),
    ("Espiritualidade", "espiritualidade"),
    ("Quadrinhos", "quadrinhos"),
]


async def seed():
    async with AsyncSessionLocal() as db:
        # Admin
        result = await db.execute(select(Pessoa).where(Pessoa.telefone == ADMIN_TELEFONE))
        pessoa = result.scalar_one_or_none()

        if pessoa is None:
            pessoa = Pessoa(nome=ADMIN_NOME, telefone=ADMIN_TELEFONE)
            db.add(pessoa)
            await db.flush()
            db.add(Usuario(pessoa_id=pessoa.id, senha_hash=hash_senha(settings.ADMIN_SENHA)))
            await db.commit()
            print(f"[seed] Admin criado — telefone: '{ADMIN_TELEFONE}'")
        else:
            print("[seed] Admin já existe, pulando.")

        # Gêneros
        result = await db.execute(select(Genero))
        existentes = {g.slug for g in result.scalars().all()}

        novos = [Genero(nome=nome, slug=slug) for nome, slug in GENEROS if slug not in existentes]
        if novos:
            db.add_all(novos)
            await db.commit()
            print(f"[seed] {len(novos)} gênero(s) criado(s).")
        else:
            print("[seed] Gêneros já existem, pulando.")


if __name__ == "__main__":
    asyncio.run(seed())
