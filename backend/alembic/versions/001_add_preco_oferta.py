"""add preco_oferta to livros

Revision ID: 001
Revises:
Create Date: 2026-03-20
"""
from alembic import op
import sqlalchemy as sa

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("livros", sa.Column("preco_oferta", sa.Numeric(10, 2), nullable=True))


def downgrade() -> None:
    op.drop_column("livros", "preco_oferta")
