# Phase 0: Research & Clarifications

**Date**: 2026-04-01  
**Feature**: Exibição da Home  
**Purpose**: Resolver NEEDS CLARIFICATION issues e validar abordagem técnica

---

## Clarification 1: Imagens em Notícias Secundárias

### Contexto (do spec.md)
FR-005 questiona se imagens de notícias secundárias são obrigatórias ou opcionais.

### Decisão Tomada
✅ **OBRIGATÓRIAS com FALLBACK (placeholder)**

### Rationale (por quê escolhida)
1. **Performance e UX consistente**: Imagem obrigatória garante layout estável (sem layout shift abruptos)
2. **Acessibilidade**: Alt text obrigatório em todas as imagens (WCAG AA)
3. **Visual consistency**: Grid com imagens em todos os cards oferece experiência visual melhor
4. **Fallback permite flexibilidade**: Se imagem falhar ao carregar, placeholder genérico mantém layout integro
5. **Alinha com constituição**: Performance (CLS < 0.1) e Acessibilidade (WCAG AA) são princípios

### Alternativas Consideradas

| Opção | Pros | Cons | Status |
|-------|------|------|--------|
| **A: Imagens obrigatórias (sem fallback)** | Melhor visual; consistência | Falha se imagem não carregar; quebra layout | ❌ Rejeitado |
| **B: Imagens opcionais** | Flexibilidade de dados | Layout inconsistente; UX pobre; WCAG issues | ❌ Rejeitado |
| **C: Imagens obrigatórias com fallback** | Robustez; UX; Performance; A11y | Requer placeholder design | ✅ **ESCOLHIDA** |

### Implementação
- **Imagem primária**: URL esperada em `news.imagem`
- **Fallback**: Se falhar, exibir placeholder SVG genérico (ícone de jornal ou similar)
- **Height & Width obrigatórios**: Evita layout shift (CLS)
- **Loading lazy**: `loading="lazy"` para imagens secundárias (performance)

---

## Technical Stack Validation

### Decisão: Vite vs Create React App

**ESCOLHIDO: Vite**

- ✅ Bundler mais rápido (HMR instantâneo)
- ✅ Build menor (~30% vs CRA)
- ✅ Suporta JSX nativamente
- ✅ Menos opinionado (flexibilidade)
- ✅ Melhor para FCP < 1.5s target

### Decisão: React Router v6

**ESCOLHIDO: React Router 6+**

- ✅ Padrão moderno para SPAs
- ✅ Suporta nested routes (se crescer para múltiplas páginas)
- ✅ Keyboard navigation acessível
- ✅ Link component com prefetch (performance)
- ℹ️ Alternativa simples (react-location) não mais mantida

### Decisão: Data Storage

**ESCOLHIDO: JSON Local (`public/data/news.json`)**

- ✅ Sem latência (dados bundled)
- ✅ Simples e testável (sem API real)
- ✅ FCP < 1.5s garantido (dados pre-loaded)
- ✅ OK para projeto pequeno
- ℹ️ Escalaria para API real depois (sem mudanças de componentes)

### Decisão: Sem Testes Automatizados

**CONFORME CONSTITUIÇÃO**: Sem testes

- ✅ Projeto pequeno (< 500 linhas de código esperado)
- ✅ Constituição explícita: "no automated tests"
- ✅ QA manual suficiente para escopo
- ⚠️ Adicionar testes requer nova decisão na constituição (breaking change)

---

## Performance Targets - Validação

### Target 1: FCP < 1.5s em 3G

**Abordagem para alcançar**:
1. Vite minifica CSS + JS automaticamente
2. Tailwind purge remove classes não usadas
3. JSON local (0 latência de rede)
4. Imagem de manchete priorizada (eager load)
5. Imagens secundárias lazy-loaded

**Status**: ✅ Viável com Vite + local data

### Target 2: CLS < 0.1 (no layout shift)

**Abordagem para alcançar**:
1. Width/height obrigatórios em `<img>` tags
2. Placeholder pré-alocado para lazy images
3. Falout de imagens não move layout
4. CSS Grid com tamanhos fixos por coluna

**Status**: ✅ Viável com CSS + HTML bem estruturado

### Target 3: WCAG AA Acessibilidade

**Abordagem para alcançar**:
1. Tailwind fornece cores com contraste validado
2. Usar `<article>`, `<section>` semântico
3. `alt` obrigatório em imagens
4. Navegação por teclado: Tab, Enter funcional
5. Links semânticos (não divs com onClick)

**Status**: ✅ Viável com HTML semântico + Tailwind

---

## Decisions Summary

| Questão | Decisão | Rationale |
|---------|---------|-----------|
| Imagens secundárias obrigatórias? | Sim, com fallback | Performance + A11y + UX |
| Bundler | Vite | Fast, small, modern |
| Routing | React Router 6 | Padrão, acessível, escalável |
| Data source | JSON local | FCP target, simples |
| Testes automatizados | Não | Conforme constituição |
| Componentes React | Simples, sem state complexo | Clean code princípio |

**Conclusion**: ✅ Abordagem técnica validada. Pronto para Phase 1 Design.

---

**Version**: 1.0 | **Date**: 2026-04-01