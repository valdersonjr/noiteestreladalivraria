# Noite Estrelada — Frontend

Interface web da livraria Noite Estrelada. Construída com Next.js 15 (App Router), Tailwind CSS v4 e TypeScript.

---

## Pré-requisitos

- [Node.js](https://nodejs.org) 20+
- [Docker](https://www.docker.com) (opcional, para rodar via container)
- Backend rodando em `http://localhost:8000` (veja o README do backend)

---

## Rodando em desenvolvimento

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> O arquivo `.env` já existe e é usado pelo Docker Compose. O `.env.local` é carregado automaticamente pelo Next.js em desenvolvimento.

### 3. Iniciar o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Rodando com Docker

### 1. Configurar variáveis de ambiente

Verifique se o arquivo `.env` existe na raiz do projeto:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Subir o container

```bash
docker-compose up --build -d
```

O servidor inicia em modo desenvolvimento com **hot reload** — alterações nos arquivos refletem automaticamente sem rebuild.

### 3. Parar

```bash
docker-compose down
```

---

## Painel Admin

Acesse [http://localhost:3000/admin](http://localhost:3000/admin).

Sem sessão ativa, o sistema redireciona para `/admin/login`. Use as credenciais configuradas no seed do backend (por padrão, telefone e senha definidos em `backend/app/seed.py`).

---

## Estrutura relevante

```
app/
  (public)/          # Páginas públicas (catálogo, homepage)
  admin/             # Painel administrativo (protegido por JWT)
    login/
    livros/
    pessoas/
    vendas/
components/
  ui/                # Componentes base (Button, Input, Table, Modal...)
  admin/             # Componentes do painel (Sidebar, forms...)
  layout/            # Header, Footer
services/            # Chamadas à API
  admin/             # Endpoints protegidos
types/               # Interfaces TypeScript
lib/                 # Strings centralizadas
hooks/               # useAuth
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia em desenvolvimento com hot reload |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia o build de produção |
| `npm run lint` | Verifica o código com ESLint |
