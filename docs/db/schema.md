# Schema do Banco de Dados — Noite Estrelada

---

## Diagrama ER

```mermaid
erDiagram
    pessoas {
        int id PK
        string nome
        string telefone UK
        string email
        timestamp criado_em
    }

    usuarios {
        int id PK
        int pessoa_id FK UK
        string senha_hash
        timestamp criado_em
    }

    generos {
        int id PK
        string nome UK
        string slug UK
    }

    livros {
        int id PK
        string titulo
        string autor
        string slug UK
        decimal preco
        string condicao
        text descricao
        string foto
        bool disponivel
        int vendedor_id FK
        timestamp criado_em
        timestamp atualizado_em
    }

    livro_genero {
        int livro_id FK
        int genero_id FK
    }

    vendas {
        int id PK
        int livro_id FK
        int comprador_id FK
        decimal preco_venda
        decimal taxa_comissao
        decimal valor_comissao
        decimal taxa_entrega
        string forma_pagamento
        string status
        bool repasse_realizado
        timestamp repasse_em
        text observacoes
        timestamp criado_em
    }

    pessoas ||--o| usuarios : "pode ser usuário"
    pessoas ||--o{ livros : "vendedor externo"
    pessoas ||--o{ vendas : "comprador"
    livros ||--o{ vendas : "vendido em"
    livros ||--o{ livro_genero : "tem"
    generos ||--o{ livro_genero : "pertence a"
```

---

## Tabelas

### `pessoas`
Representa qualquer pessoa que interage com o sistema — compradores, vendedores externos e o admin.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | int | PK | Identificador único |
| `nome` | varchar(255) | NOT NULL | Nome completo |
| `telefone` | varchar(20) | UNIQUE, NOT NULL | WhatsApp — identificador real da pessoa |
| `email` | varchar(255) | nullable | Email opcional |
| `criado_em` | timestamp | NOT NULL | Data de cadastro |

---

### `usuarios`
Extensão de `pessoas` para quem precisa de acesso autenticado ao sistema. Por ora, exclusivo para o admin.

> Todo usuário é uma pessoa, mas nem toda pessoa é um usuário.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | int | PK | Identificador único |
| `pessoa_id` | int | FK → pessoas, UNIQUE | Relação 1-to-1 com pessoas |
| `senha_hash` | varchar(255) | NOT NULL | Senha criptografada |
| `criado_em` | timestamp | NOT NULL | Data de criação |

---

### `generos`
Tags de gênero literário para categorização dos livros.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | int | PK | Identificador único |
| `nome` | varchar(100) | UNIQUE, NOT NULL | Nome do gênero (ex: Romance) |
| `slug` | varchar(100) | UNIQUE, INDEX | Versão URL-friendly (ex: romance) |

---

### `livros`
Catálogo de livros disponíveis para venda.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | int | PK | Identificador único |
| `titulo` | varchar(255) | NOT NULL | Título do livro |
| `autor` | varchar(255) | NOT NULL | Nome do autor |
| `slug` | varchar(255) | UNIQUE, INDEX | Identificador para URL |
| `preco` | decimal(10,2) | NOT NULL | Preço de venda |
| `condicao` | varchar(10) | NOT NULL | `novo` ou `usado` |
| `descricao` | text | NOT NULL | Sinopse |
| `foto` | varchar(500) | NOT NULL | URL da foto |
| `disponivel` | bool | NOT NULL, default true | Visibilidade no catálogo |
| `vendedor_id` | int | FK → pessoas, nullable | Preenchido só para livros de terceiros |
| `criado_em` | timestamp | NOT NULL | Data de cadastro |
| `atualizado_em` | timestamp | NOT NULL | Última atualização |

---

### `livro_genero`
Tabela de associação many-to-many entre livros e gêneros.

| Coluna | Tipo | Restrições |
|---|---|---|
| `livro_id` | int | FK → livros, PK |
| `genero_id` | int | FK → generos, PK |

---

### `vendas`
Registro de todas as transações realizadas.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | int | PK | Identificador único |
| `livro_id` | int | FK → livros, NOT NULL | Livro vendido |
| `comprador_id` | int | FK → pessoas, NOT NULL | Quem comprou |
| `preco_venda` | decimal(10,2) | NOT NULL | Valor real da venda |
| `taxa_comissao` | decimal(5,2) | NOT NULL, default 10.00 | % de comissão aplicada |
| `valor_comissao` | decimal(10,2) | NOT NULL | Valor calculado da comissão |
| `taxa_entrega` | decimal(10,2) | nullable | Taxa de entrega cobrada |
| `forma_pagamento` | varchar(50) | NOT NULL | Ex: pix, dinheiro, cartão |
| `status` | varchar(20) | NOT NULL, default pendente | `pendente`, `concluida`, `cancelada` |
| `repasse_realizado` | bool | NOT NULL, default false | Se o repasse ao vendedor foi feito |
| `repasse_em` | timestamp | nullable | Quando o repasse foi realizado |
| `observacoes` | text | nullable | Anotações livres |
| `criado_em` | timestamp | NOT NULL | Data da venda |

---

## Decisões de Design

| Decisão | Motivo |
|---|---|
| `usuarios` separado de `pessoas` | Todo usuário é uma pessoa, mas nem toda pessoa é um usuário |
| `taxa_comissao` salva na venda | Percentual negociável — não pode depender de uma config global |
| `valor_comissao` calculado e salvo | Histórico imutável mesmo se a regra de negócio mudar |
| `repasse_realizado` + `repasse_em` | Controle simples de fluxo de caixa com vendedores externos |
| `atualizado_em` só em `livros` | Único model que sofre edições frequentes |
| `telefone` unique em `pessoas` | Evita cadastro duplicado — WhatsApp é o identificador real |
| `vendedor_id` nullable em `livros` | Livro próprio do admin não tem vendedor externo |

---

## Evolução Futura

- Roles em `usuarios` para múltiplos tipos de acesso
- `is_comprador` / `is_vendedor` em `pessoas` para diferenciar perfis
- Login para compradores e vendedores externos
