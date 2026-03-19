from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import livros, auth
from app.routers.admin import livros as admin_livros
from app.routers.admin import pessoas as admin_pessoas
from app.routers.admin import vendas as admin_vendas

app = FastAPI(title="Noite Estrelada API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Públicos
app.include_router(auth.router)
app.include_router(livros.router)

# Admin (protegidos por JWT)
app.include_router(admin_livros.router)
app.include_router(admin_pessoas.router)
app.include_router(admin_vendas.router)
