# Implementation Plan: Exibição da Home

**Branch**: `001-exibicao-home` | **Date**: 2026-04-01 | **Spec**: [spec.md](./spec.md)
**Input**: React 18 + Vite + Tailwind; React Router para navegação; dados em JSON local; sem testes automatizados; foco em renderização semântica e performance

## Summary

Implementar a página home de um portal de notícias com duas user stories principais (P1):
1. **Manchete Principal**: Notícia destaque com imagem grande, título e link
2. **Grade de Notícias Secundárias**: Grid responsivo (2-4 colunas) com 4+ notícias

A implementação prioriza os princípios da constituição: **Acessibilidade** (WCAG AA), **Performance** (FCP < 1.5s), e **Credibilidade** (byline + fonte).

## Technical Context

**Language/Version**: JavaScript (Node.js 18+) / React 18.2+  
**Primary Dependencies**: React 18, Vite (bundler), React Router 6+, Tailwind CSS 3.x  
**Storage**: JSON local (`public/data/news.json`) – arquivo estático com dados de notícias  
**Testing**: Nenhum (conforme constituição – projeto pequeno)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari – últimas 2 versões)  
**Project Type**: Single-Page Application (SPA) – portal web  
**Performance Goals**: FCP < 1.5s em 3G; CLS < 0.1; Lighthouse Performance ≥ 80  
**Constraints**: Sem bibliotecas pesadas (usar CSS nativo + Tailwind); componentes React simples (<20 linhas); imagens lazy-loaded nas secundárias  
**Scale/Scope**: Home page única; ~1-15 notícias (dados mockados em JSON); < 200 KB JS bundle (target)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Acessibilidade (A11y)
**Status**: ✅ COMPLIANT
- Semântica HTML obrigatória: usar `<article>`, `<section>`, `<header>`, `<main>`
- Manchete e grid usarão tags semânticas apropriadas
- Contraste WCAG AA garantido via Tailwind (esquemas de cores pré-validados)
- Navegação por teclado: Tab entre notícias, Enter para abrir, Esc para fechar (se modal)
- Imagens com `alt` text descritivo obrigatório em todas as News
- **Nenhuma violação identificada**

### ✅ Performance
**Status**: ✅ COMPLIANT
- FCP < 1.5s em 3G: Vite produz bundles otimizados; dados em JSON local (0 latência API)
- Lazy loading implementado para imagens de notícias secundárias (`loading="lazy"`)
- CSS Tailwind purificado (remove classes não usadas)
- Componentes React.memo para evitar re-renders desnecessários
- Bundle target < 200KB (React 18 + Router ~150KB minificado + gzip)
- **Nenhuma violação identificada**

### ✅ Credibilidade
**Status**: ✅ COMPLIANT
- Byline obrigatório: exibir autor + data_publicacao em cada notícia
- Fonte (fonte original) exibida como link em notícias
- Metadata estruturada para SEO básico (title, description na home)
- Sem filtros editoriais (apenas ordem por publicação/importância dos dados)
- **Nenhuma violação identificada**

### Conclusion
✅ **GATES PASSED** – Nenhuma violação à constituição. Prosseguir para Phase 0.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-exibicao-home/
├── spec.md              # Feature spec (input)
├── plan.md              # This file (you are here)
├── research.md          # Phase 0 output (created next)
├── data-model.md        # Phase 1 output (created next)
├── quickstart.md        # Phase 1 output (created next)
├── contracts/           # Phase 1 output (if needed)
└── checklists/
    └── requirements.md  # Validation checklist
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── NewsCard.jsx         # Componente reutilizável para notícia
│   ├── NewsFeatured.jsx     # Manchete principal
│   ├── NewsGrid.jsx         # Grid de notícias secundárias
│   └── Layout.jsx           # Layout raiz com header/footer
├── pages/
│   ├── Home.jsx             # Página home (assembla componentes)
│   └── Article.jsx          # Página de artigo individual
├── hooks/
│   └── useNews.js           # Hook para carregar dados de notícias
├── utils/
│   └── constants.js         # Constantes (cores, breakpoints, etc)
├── styles/
│   └── globals.css          # Estilos globais + Tailwind imports
├── data/
│   └── news.json            # Dados mockados de notícias (public/data/)
└── App.jsx                  # Root component + Router setup
```

**Structure Decision**: Single-project web application format (Option 2 variant for SPA). No backend separation needed – dados vêm de arquivo JSON estático. React Router para single-page navigation.

## Complexity Tracking

No complexity violations identified. All requirements align with constitution. Proceeding to Phase 0 research.
