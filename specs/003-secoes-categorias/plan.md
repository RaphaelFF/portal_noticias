# Feature 003 - Seções de Categorias: Plan

**Status**: Ready to Start  
**Last Updated**: 2026-04-02

---

## 📋 Overview

A Feature 003 é uma extensão da Home (Feature 001) que adiciona **8 seções dinâmicas de categorias** mostrando as notícias mais recentes de cada categoria. O objetivo é melhorar a navegação e descoberta de conteúdo sem que o leitor saia da home.

---

## 🎯 Objectives

1. **Objetivo Funcional**: Adicionar seções dinâmicas para cada categoria na home
2. **Objetivo de UX**: Aumentar descoberta de conteúdo e engajamento
3. **Objetivo de Performance**: Manter FCP < 1.5s mesmo com mais conteúdo
4. **Objetivo de Acessibilidade**: Manter WCAG AA em todos os elementos novos

---

## 🔑 Key Features

- **8 Seções Dinâmicas**: Uma para cada categoria (ÚLTIMAS NOTÍCIAS, CULTURA, ECONOMIA, EDUCAÇÃO, ESPORTES, MEIO AMBIENTE, POLÍTICA, SAÚDE)
- **Conteúdo Inteligente**: Up to 4 notícias por seção, sem duplicação da manchete
- **Responsividade**: 1/2/4 colunas dependendo do dispositivo
- **Design System**: Cores Brasil aplicadas (verde, amarelo, azul)
- **Performance**: Lazy loading, memoização, lightweight
- **Acessibilidade**: Completa (WCAG AA, keyboard nav, screen reader)

---

## 📊 Architecture Overview

```
Home.jsx (página principal)
├── NewsFeatured (manchete - Feature 001)
├── NewsGrid (grid secundário - Feature 001)
└── CategorySection[] (NOVO - Feature 003)
    ├── Título da Categoria (H2)
    ├── Grid de CardNews (4 cols max)
    └── Link "Ver Todas"
        └── → CategoryPage (/categories/[slug])

Hooks:
├── useNewsByCategory (existente, estender com exclude_id)
├── useMemo (memoizar filtragem)

Utils:
├── CATEGORIES constant (em constants.js)
└── Helpers de slug/normalization
```

---

## 🛠️ Technical Approach

### Components to Create

| Component | Responsabilidade | Reutilizável |
|-----------|------------------|--------------|
| **CategorySection** | Renderiza título + grid + link "ver todas" | Sim (pode ser usada em outras páginas) |
| **(Opcional) CategorySkeleton** | Placeholder durante loading | Sim |

### Components to Extend/Modify

| Component | Mudança |
|-----------|--------|
| **Home.jsx** | Adicionar loop sobre CATEGORIES, renderizar CategorySection para cada |
| **useNewsByCategory** | Adicionar parâmetro `exclude_id` para filtrar manchete |

### No New Dependencies

- Todas as libs necessárias já estão no projeto (React, Tailwind, Vite)
- NewsCard componente já existe
- useNewsByCategory hook já existe

---

## 📐 Layout & Design

### Seções Layout

```
┌─────────────────────────────────────────┐
│  Home                                   │
├─────────────────────────────────────────┤
│  📰 MANCHETE PRINCIPAL (Feature 001)     │
├─────────────────────────────────────────┤
│  📄 GRID SECUNDÁRIO (Feature 001)        │
│  [card] [card] [card] [card]             │
├─────────────────────────────────────────┤
│  ECONOMIA                          [✓]  │  ← CategorySection (NOVA)
│  [card] [card] [card] [card]             │
│  Ver todas as notícias de Economia      │
├─────────────────────────────────────────┤
│  ESPORTES                          [✓]  │  ← CategorySection
│  [card] [card] [card] [card]             │
│  Ver todas as notícias de Esportes      │
├─────────────────────────────────────────┤
│  ...mais 6 seções...                    │
└─────────────────────────────────────────┘

[✓] = Background alternado (branco/cinza)
```

### Colors Applied

- **Verde Brasil** (#228B22): Títulos H2
- **Amarelo** (#FFD700): Button "Ver Todas" (hover), badges categoria
- **Azul Marinho** (#001A4D): Texto badge
- **Cinza Neutro** (#F5F5F5): Background seções pares
- **Branco** (#FFFFFF): Background seções ímpares

---

## ⚡ Performance Strategy

1. **Lazy Loading de Imagens**: `loading="lazy"` nativo em img tags
2. **Memoização**: `useMemo` para evitar recálculos de filtragem
3. **Code Splitting**: Componentes novos não causam aumento > 5% bundle
4. **Scroll Performance**: Sem animations pesadas, CSS transforms suave
5. **Keine Dups**: Verificação de ID para excluir manchete

---

## ♿ Accessibility Plan

1. **Semântica**: H1 manchete, H2 categoria, article/li em cards
2. **Contraste**: Validar WCAG AA (4.5:1 texto normal, 3:1 grande)
3. **Keyboard**: Tab navega seções, Enter/Space ativa links
4. **Screen Reader**: aria-labels em botões, ordem lógica
5. **States**: aria-live para carregamento/erro

---

## 🧪 Testing Approach

### Unit Tests
- Hook `useNewsByCategory` com `exclude_id`
- Componente `CategorySection` com props
- Estados (loading, error, empty)

### Integration Tests
- Home renderiza 8 seções corretamente
- Links "Ver Todas" navegam para categoria correta
- Manchete excluída de todas seções

### Visual/Responsive Tests
- Screenshots em 375px (mobile), 800px (tablet), 1200px (desktop)
- Sem horizontal scroll, elementos bem alinhados

### Accessibility Tests
- axe scan (target: 0 critical, < 2 minor)
- Lighthouse > 90
- Manual navegação com Tab/Enter em diferente navegador
- Manual leitura com NVDA (Windows) ou VoiceOver (Mac)

### Performance Tests
- Lighthouse FCP < 1.5s (3G simulado)
- CLS < 0.1
- Bundle size +5% máx

---

## 📅 Estimated Timeline

| Phase | Task | Days | Owner |
|-------|------|------|-------|
| **Planning** | Review spec, aprovação | 1 | PM |
| **Design** | Assets/variaçõesde layout | 0.5 | Designer |
| **Dev** | Componentes CategorySection, Home.jsx mods | 2 | Dev |
| **Testing** | Unit, integration, visual, accessibility | 1.5 | QA + Dev |
| **Refinement** | Ajustes baseados em testes | 0.5 | Dev |
| **Review/Merge** | Code review, merge em main | 0.5 | Lead |
| **TOTAL** | | **6 dias** | |

---

## 🔄 Dependencies & Blockers

### Soft Dependencies (Recomendadas)
- Feature 001 (Home + manchete) já finalizada ✅
- Feature 002 (Header) já finalizada ✅
- Design System definido ✅

### No Hard Blockers
- Dados em `public/data/news.json` já disponível ✅
- Hooks (`useNewsByCategory`) já existem ✅
- NewsCard componente já existe ✅

---

## 📦 Deliverables

- ✅ **Code**: PR com branch `003-secoes-categorias` mergead em `main`
- ✅ **Spec**: Este documento (spec.md) finalizado
- ✅ **Tests**: Unit, integration, visual, accessibility com cobertura > 80%
- ✅ **Docs**: JSDoc em componentes, atualizações em README
- ✅ **Demo**: Deploy em staging/vercel
- ✅ **QA Sign-off**: Checklist aprovado

---

## 🏁 Done Criteria

Quando todos esses itens forem ✅:

- [ ] 8 CategorySection renderizam corretamente
- [ ] Manchete excluída de seções (verificado em teste)
- [ ] Links "Ver Todas" funcionam e navegam corretamente
- [ ] Layout responsivo 100% (3+ viewports testados)
- [ ] Acessibilidade validada (axe, Lighthouse > 90)
- [ ] Performance dentro de métricas (FCP, CLS, bundle)
- [ ] Testes passam (unit, integration, visual)
- [ ] Documentação atualizado
- [ ] Code review aprovado
- [ ] Nenhum erro de console

---

## 📝 Notes

- Reutilizar `NewsCard` componente sem modificação (já tem estilo correto)
- Se `useNewsByCategory` não tiver `exclude_id`, adicionar com retro-compatibilidade
- Considerar criar um `CategorySection` reutilizável para potencial uso em outras páginas
- Lazy loading nativo (`loading="lazy"`) é suportado em navegadores modernos, adicionar fallback com IntersectionObserver se necessário (polyfill)

