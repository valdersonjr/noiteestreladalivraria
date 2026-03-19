# Arquitetura Técnica — Noite Estrelada

---

## Stack

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js |
| **Backend** | FastAPI (Python) |
| **Banco de dados** | PostgreSQL |
| **Chat IA** | API de LLM externa com injeção de contexto (RAG) |
| **Infraestrutura** | Docker Compose (um por serviço) |

---

## Infraestrutura Docker

Cada serviço tem seu próprio `docker-compose.yml`, permitindo rodar e desenvolver de forma independente:

| Serviço | docker-compose | Conteúdo |
|---|---|---|
| **Frontend** | `frontend/docker-compose.yml` | Container Next.js |
| **Backend** | `backend/docker-compose.yml` | Container FastAPI + PostgreSQL |

> O PostgreSQL sobe junto com o backend por ser sua dependência direta.

---

## Diagrama de Componentes

```mermaid
graph TD
    subgraph Cliente
        Browser([Navegador])
    end

    subgraph dc-frontend [docker-compose frontend]
        Next[Next.js]
    end

    subgraph dc-backend [docker-compose backend]
        API[FastAPI]
        RAG[RAG / Contexto]
        DB[(PostgreSQL)]
    end

    subgraph Externo
        LLM[API LLM]
        WA[WhatsApp]
        Planilha[Planilha / JSON\nAdmin]
    end

    Browser --> Next
    Next --> API
    API -->|busca livros| DB
    API --> RAG
    RAG -->|contexto do catálogo| DB
    RAG -->|prompt + contexto| LLM
    Planilha -->|atualiza catálogo| DB
    Next -.->|link de contato| WA
```
