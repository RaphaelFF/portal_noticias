# Feature 003 - Seções de Categorias: Data Model

**Last Updated**: 2026-04-02  
**Status**: Reference Document

---

## 📊 Overview

Este documento documenta a estrutura de dados utilizada na Feature 003. A feature **não introduz novos tipos de dados**, apenas **estende e refina** o uso dos dados existentes da Feature 001.

---

## 🔄 Objetos de Dados

### News (Notícia)

Cada notícia no sistema possui a seguinte estrutura:

```typescript
interface News {
  id: string | number;                    // Identificador único
  titulo: string;                         // Título da notícia (obrigatório)
  slug: string;                           // URL amigável (ex: "economia-brasil")
  categoria: CATEGORIA;                   // Categoria da notícia
  imagem: string;                         // URL absoluta da imagem
  resumo: string;                         // Descrição breve (< 150 chars)
  data_publicacao: string;                // ISO date string (ex: "2026-04-02T10:30:00Z")
  autor: string;                          // Nome do autor/fonte
  conteudo: string;                       // Texto completo (usado em Article page)
  fonte?: string;                         // Referência de fonte (opcional)
  tags?: string[];                        // Palavras-chave (opcional)
}
```

### Type: CATEGORIA

Enum das categorias disponíveis:

```typescript
type CATEGORIA = 
  | 'ÚLTIMAS NOTÍCIAS'
  | 'CULTURA'
  | 'ECONOMIA'
  | 'EDUCAÇÃO'
  | 'ESPORTES'
  | 'MEIO AMBIENTE'
  | 'POLÍTICA'
  | 'SAÚDE'
```

**Definição em código**:
```javascript
// src/utils/constants.js
export const CATEGORIES = [
  'ÚLTIMAS NOTÍCIAS',
  'CULTURA',
  'ECONOMIA',
  'EDUCAÇÃO',
  'ESPORTES',
  'MEIO AMBIENTE',
  'POLÍTICA',
  'SAÚDE'
]
```

---

## 📁 Data Sources

### Primary: JSON Estático

```
public/data/news.json
↓
Array<News>
↓
Carregado via fetch() em useNews hook
↓ Filtrado/Memoizado em useNewsByCategory hook
↓ Renderizado em CategorySection
```

**Estrutura do arquivo**:
```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "Economia cresce 2.5% no trimestre",
      "slug": "economia-crescimento-trimestre",
      "categoria": "ECONOMIA",
      "imagem": "https://cdn.example.com/economia-1.jpg",
      "resumo": "Breve descrição...",
      "data_publicacao": "2026-04-02T10:30:00Z",
      "autor": "João Silva",
      "conteudo": "Texto completo da notícia...",
      "fonte": "Agência Nacional de Notícias"
    },
    {...}
  ]
}
```

---

## 📋 Data Flow em Feature 003

### 1. Carregamento Inicial

```
App.jsx / Home.jsx
  ↓
  useNews() hook
    ↓
    fetch('public/data/news.json')
      ↓
      JSON.parse()
        ↓
        return { 
          featuredNews: News,
          news: Array<News>
        }
```

### 2. Filtragem por Categoria

```
CategorySection.jsx
  ↓
  useNewsByCategory(category, { exclude_ids })
    ↓
    Input:  
      - category: string ("ECONOMIA")
      - exclude_ids: [42] (manchete)
      - allNews: Array<News>
    ↓
    Processamento:
      1. Filter: n.categoria === category
      2. Filter: !exclude_ids.includes(n.id)
      3. Sort: by data_publicacao DESC
      4. Slice: [0:4]
      5. Memoize: useMemo cache
    ↓
    Output: Array<News> (0-4 items)
```

### 3. Renderização

```
Filtered Array<News>
  ↓
  .map(news => <NewsCard news={news} />)
    ↓
    Para cada card:
      - news.imagem
      - news.titulo
      - news.resumo
      - news.categoria (badge)
      - news.data_publicacao
      - news.autor
      - Link para: /article/{news.slug}
```

---

## 🔄 Relações de Dados

### Hierarquia

```
Portal (Home)
├── NewsFeatured (1 notícia)
│   └── id = featuredNews.id (ex: 42)
│
├── NewsGrid (4-6 notícias secundárias)
│   └── ids ≠ 42 (excluída manchete)
│
└── CategorySections[] (8)
    ├── [ÚLTIMAS NOTÍCIAS]
    │   └── top 4 where categoria='ÚLTIMAS NOTÍCIAS' and id ≠ 42
    │
    ├── [CULTURA]
    │   └── top 4 where categoria='CULTURA' and id ≠ 42
    │
    ├── [ECONOMIA]
    │   └── top 4 where categoria='ECONOMIA' and id ≠ 42
    │
    └── ... (5 mais categorias)
```

### Exemplo de Dados Concretos

```json
{
  "noticias": [
    {
      "id": 42,
      "titulo": "Manchete Principal do Dia",
      "categoria": "ÚLTIMAS NOTÍCIAS",
      "data_publicacao": "2026-04-02T15:00:00Z"
      // ← USADA: NewsFeatured
      // ← EXCLUÍDA: Todas as CategorySections
    },
    {
      "id": 1,
      "categoria": "ECONOMIA",
      "data_publicacao": "2026-04-02T14:00:00Z"
      // ← INCLUÍDA: CategorySection ECONOMIA (position 1)
    },
    {
      "id": 2,
      "categoria": "ECONOMIA",
      "data_publicacao": "2026-04-02T13:00:00Z"
      // ← INCLUÍDA: CategorySection ECONOMIA (position 2)
    },
    {
      "id": 3,
      "categoria": "ESPORTES",
      "data_publicacao": "2026-04-02T12:00:00Z"
      // ← INCLUÍDA: CategorySection ESPORTES (position 1)
    }
  ]
}
```

---

## 🎯 Data Requirements para Feature 003

### Adequação de Campos Existentes

| Campo | Usado em 003 | Requerido | Nota |
|-------|-----------|----------|------|
| `id` | ✅ Filtragem | ✅ SIM | Identificar manchete exclusão |
| `titulo` | ✅ Exibição | ✅ SIM | Título do card |
| `slug` | ✅ Link | ✅ SIM | `/article/{slug}` |
| `categoria` | ✅ Filtragem | ✅ SIM | Categorizar por seção |
| `imagem` | ✅ Exibição | ✅ SIM | Image card |
| `resumo` | ✅ Exibição | ⚠️ Recomendado | Descrição no card |
| `data_publicacao` | ✅ Sorting | ✅ SIM | Ordenar DESC (mais recentes) |
| `autor` | ✅ Exibição | ⚠️ Recomendado | Metadata card |
| `conteudo` | ❌ Não | ❌ NÃO | Usado só em Article page |
| `fonte` | ❌ Não | ❌ NÃO | Usado só em Article page |
| `tags` | ❌ Não | ❌ NÃO | (Opcional para futures) |

### Dados de Exemplo Mínimos

Para Category Section funcionar, mínimo necessário é:

```json
{
  "noticias": [
    {
      "id": 1,
      "titulo": "Título da Notícia",
      "slug": "titulo-da-noticia",
      "categoria": "ECONOMIA",
      "imagem": "https://example.com/image.jpg",
      "data_publicacao": "2026-04-02T10:00:00Z"
    }
  ]
}
```

Mas recomendado incluir `resumo`, `autor` para melhor UX.

---

## 🔐 Data Validation

### Validação ao Carregar

```javascript
// Em useNews hook ou factory
function validateNews(items) {
  return items.filter(news => {
    // Validações necessárias
    if (!news.id) return false;                    // ID obrigatório
    if (!news.titulo || news.titulo.length === 0) return false;
    if (!news.categoria) return false;
    if (!CATEGORIES.includes(news.categoria)) return false; // Categoria válida
    if (!news.imagem) return false;
    if (!news.data_publicacao) return false;
    if (isNaN(new Date(news.data_publicacao))) return false; // Data válida ISO
    
    return true;
  });
}
```

### Sanitização

```javascript
// Se necessário
news.titulo = news.titulo.trim().substring(0, 200);      // Limpar, truncar
news.resumo = news.resumo.trim().substring(0, 150);
news.categoria = news.categoria.toUpperCase().trim();    // Normalizar
```

---

## 📊 Data Statistics

### Esperado para Ambiente Produção

| Métrica | Estimativa | Nota |
|--------|-----------|------|
| Total de notícias | 200-500 | 1-2 anos de content |
| Notícias por categoria | 25-60 | Distribuição variável |
| Notícias por dia | 5-20 | Dep. de frequência publi |
| Tamanho JSON raw | 5-15 MB | (Descomprimido) |
| Tamanho JSON gzip | 1-3 MB | Transferência de rede |
| Tempo fetch | 200-500ms | Incluindo network |

### Performance Impact

```
// Recomendação: Implementar paginação se > 1000 notícias
// Para Feature 003 (4 notícias por seção):
  - Filtragem: O(n) = 200-500 items
  - Sort: O(n log n) em teoria, mas rápido em prática
  - Slice: O(1)
  - Total: < 50ms em máquina padrão
```

---

## 🔄 Mutações de Dados (Futuro)

### Escopo Atual (Feature 003)

- ❌ Sem criação de notícias
- ❌ Sem edição de notícias
- ❌ Sem deleção de notícias
- ✅ Apenas **leitura** de JSON estático

### Futuro (Features 004+)

Se implementar Admin Panel:

```typescript
interface NewsCreateInput {
  titulo: string;
  categoria: CATEGORIA;
  imagem: string;
  resumo?: string;
  conteudo: string;
  autor: string;
}

interface NewsUpdateInput {
  id: string | number;
  // campos acima, todos opcionais
}

interface NewsDeleteInput {
  id: string | number;
}
```

---

## 🗄️ Data Storage Roadmap

### Presente (Feature 001-003)

```
Static JSON
(public/data/news.json)
    ↓ fetch
    ↓
  Memory (React state)
    ↓
  UI Render
```

**Vantagem**: Simples, performático para até ~500 items

### Futuro (Feature 005+)

```
Backend API
(REST ou GraphQL)
    ↓ fetch
    ↓
  Cache (localStorage / SWR)
    ↓
  Memory (React state)
    ↓
  UI Render
```

**Necessário quando**: Admin CRUD, real-time updates, 1000+ items

---

## 📌 Data Model Checklist

Para Feature 003, validar:

- [ ] `public/data/news.json` contém array `noticias`
- [ ] Cada notícia tem campos obrigatórios (id, titulo, categoria, imagem, data)
- [ ] Campo `categoria` possui valores válidos (match CATEGORIES array)
- [ ] Data em formato ISO válido
- [ ] Imagens referenciam URLs válidas
- [ ] Sem valores null/undefined em campos obrigatórios
- [ ] Dados de teste cobrem todas 8 categorias
- [ ] Pelo menos 5 notícias por categoria (para testar slice 4)
- [ ] Ordem de datas está descending (mais recentes primeiro)

---

## 🔗 Referências

- [spec.md](./spec.md) - Key Entities section
- [Feature 001 data-model.md](../001-exibicao-home/data-model.md) - Modelo base
- [public/data/news.json](../../public/data/news.json) - Dados reais
- [src/utils/constants.js](../../src/utils/constants.js) - CATEGORIES const
- [src/hooks/useNews.js](../../src/hooks/useNews.js) - Hook de fetch
- [src/hooks/useNewsByCategory.js](../../src/hooks/useNewsByCategory.js) - Hook de filtragem

---

**Documento de Referência - Data Model Feature 003** ✨

