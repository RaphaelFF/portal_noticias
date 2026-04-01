# Phase 1: Data Model & Contracts

**Date**: 2026-04-01  
**Feature**: Exibição da Home  
**Purpose**: Definir entidades de dados, relacionamentos e contratos de interface

---

## Data Model

### Entity: News (Notícia)

Representa um artigo de notícia na aplicação. Pode ser usada tanto para manchete principal quanto para notícias secundárias.

**Type Definition (TypeScript-like)**

```typescript
interface News {
  // Identificação
  id: string                    // UUID ou número único (ex: "001", "abc-123")
  slug: string                  // URL-friendly (ex: "eleicoes-2026-resultado")
  
  // Conteúdo
  titulo: string                // Headline principal (obrigatório, máx 100 chars para manchete)
  resumo?: string               // Descrição breve (recomendado, máx 200 chars)
  
  // Mídia
  imagem: string                // URL da imagem de capa (obrigatória, ex: "/images/news/001.jpg")
  imagemAlt?: string            // Alt text descritivo para imagem (obrigatório para A11y)
  
  // Metadata de publicação
  data_publicacao: string       // ISO 8601 (ex: "2026-04-01T10:30:00Z")
  ultima_atualizacao?: string   // ISO 8601 (próxima atualização se editada)
  
  // Atribuição e credibilidade
  autor: string                 // Nome do jornalista/redator (ex: "Maria Silva")
  fonte?: string                // Link para fonte original ou "Agência X"
  
  // Categorização (futuro)
  categoria?: string            // (opcional) ex: "Política", "Tecnologia"
  destaque?: boolean            // Flag indicando se é manchete principal
}
```

**Exemplos de Dados (JSON)**

```json
{
  "id": "001",
  "slug": "eleicoes-2026-resultado",
  "titulo": "Resultado das eleições 2026: vencedor eleito com 52% dos votos",
  "resumo": "Candidato vence em votação acirrada. Resultado divulgado após apuração de 95% das urnas.",
  "imagem": "/images/news/001.jpg",
  "imagemAlt": "Candidato vencedor fazendo discurso de vitória",
  "data_publicacao": "2026-04-01T09:15:00Z",
  "ultima_atualizacao": "2026-04-01T10:30:00Z",
  "autor": "Maria Silva",
  "fonte": "http://agencia-noticias.com/eleicoes",
  "destaque": true
}
```

---

### Entity: HomePageData

Agrupa os dados necessários para renderizar a home. Estrutura raiz do `news.json`.

**Type Definition**

```typescript
interface HomePageData {
  // Metadata da página
  titulo: string                           // "PortalNoticias - Últimas notícias"
  descricao: string                        // "As melhores notícias do dia"
  
  // Dados de notícias
  manchetaPrincipal: News                  // 1 notícia destaque
  noticiasSecundarias: News[]              // Array de 4-15 notícias
  
  // Footer/metadata
  ultimaAtualizacao: string                // ISO 8601
  versao: string                           // ex: "1.0.0"
}
```

**Exemplo de Estrutura**

```json
{
  "titulo": "PortalNoticias - Últimas Notícias",
  "descricao": "As melhores notícias do dia em um só lugar",
  "manchetaPrincipal": {
    "id": "001",
    "slug": "eleicoes-2026-resultado",
    ...
  },
  "noticiasSecundarias": [
    { "id": "002", "slug": "economia-inflacao", ... },
    { "id": "003", "slug": "tecnologia-ia", ... },
    ...
  ],
  "ultimaAtualizacao": "2026-04-01T15:00:00Z",
  "versao": "1.0.0"
}
```

---

## Relationships

```
HomePageData (raiz)
 ├─ manchetaPrincipal: News (1-to-1)
 └─ noticiasSecundarias: News[] (1-to-many)
```

Toda notícia (mancheta ou secundária) compartilha a mesma interface `News`, permitindo reuso de componentes React.

---

## Validation Rules

### News Validation

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| `id` | string | ✅ | Único, não vazio |
| `slug` | string | ✅ | Regex: `/^[a-z0-9-]+$/` (URL-safe) |
| `titulo` | string | ✅ | 10-200 caracteres |
| `resumo` | string | ❌ | 20-500 caracteres (se fornecido) |
| `imagem` | string | ✅ | URL válida ou caminho relativo |
| `imagemAlt` | string | ✅ | 10-200 caracteres (obrigatório para A11y) |
| `data_publicacao` | string | ✅ | ISO 8601 válido |
| `ultima_atualizacao` | string | ❌ | ISO 8601 válido (se fornecido) |
| `autor` | string | ✅ | 3-100 caracteres |
| `fonte` | string | ❌ | URL ou texto válido (se fornecido) |

### Estado de Carregamento

Durante o fetch de dados, componentes devem lidar com estados:

```typescript
type NewsLoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: HomePageData }
  | { status: 'error'; error: string }
```

---

## Browser Storage

### LocalStorage (opcional, futuro)

Se implementar "leitura recente", estrutura sugerida:

```typescript
interface RecentlyRead {
  newsIds: string[]        // Últimos 10 artigos lidos
  timestamps: Record<string, string>  // ID -> ISO timestamp
}
```

**Não incluído nesta fase** (fora do escopo P1).

---

## API Endpoint (Futura Migration)

Quando migrar de JSON local para API real, interface permanece igual:

```
GET /api/news/home
Response:
{
  "manchetaPrincipal": { ... },
  "noticiasSecundarias": [ ... ],
  ...
}
```

Componentes React não mudam – apenas source de dados (hook `useNews`).

---

## Serialization Format

**Current (Phase 1)**: JSON local (`public/data/news.json`)  
**Future**: REST API returning identical JSON structure  
**Character encoding**: UTF-8  
**Timezone**: UTC (ISO 8601 para datas)

---

## Summary

| Entidade | Campos | Restrições | Exemplo |
|----------|--------|-----------|---------|
| **News** | 9 obrigatórios + 5 opcionais | Slug único; título 10-200 chars | id: "001", slug: "eleicoes-...", ... |
| **HomePageData** | mancheta + array + metadata | Min 1 mancheta + 4 secundárias | manchetaPrincipal + 6 noticiasSecundarias |

**Version**: 1.0 | **Date**: 2026-04-01