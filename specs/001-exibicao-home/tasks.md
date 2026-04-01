# Implementation Tasks: Exibição da Home

**Feature**: Exibição da Home (PortalNoticias)  
**Branch**: `001-exibicao-home`  
**Date**: 2026-04-01  
**Spec**: [Feature Specification](./spec.md) | [Implementation Plan](./plan.md)

---

## Task Organization

**Tests**: Nenhum teste automatizado (conforme constituição – projeto pequeno)

**Organization**: Tasks são organizadas por user story para permitir implementação e testes independentes de cada história. Cada história é uma fatia completa de funcionalidade que pode ser desenvolvida, testada e demonstrada independentemente.

**Dependencies**: Fases devem ser executadas em ordem. Dentro de cada fase, tarefas marcadas com `[P]` (parallelizable) podem ser executadas simultaneamente quando usam arquivos diferentes.

**Project Structure**:
- Single-project SPA: `src/`, `public/data/`
- Sem backend: dados vêm de `public/data/news.json`
- React Router para navegação entre home e páginas de artigo

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
Implementar **User Story 1 (Manchete Principal)** oferece valor completo:
- Home carrega e exibe a notícia mais importante
- Clique acessa página de detalhe
- Layout adaptável, semântica HTML, acessibilidade WCAG AA
- FCP < 1.5s atingível

**Estimativa MVA**: T001-T015 (~2-3 dias de desenvolvimento)

### Incremental Delivery
Após MVP validado:
1. **Adicionar US2** (Grid de notícias) → home funcionalmente completa
2. **Adicionar US3** (Organização visual) → refinamentos finos

---

## Phase 1: Setup & Initialization

Preparar ambiente de desenvolviment, dependências e estrutura base.

**Goal**: Vite + React + Router rodando localmente com hot reload funcional

**Independent Test**: `npm run dev` executa sem erros; navegador mostra página em branco (pronto para componentes)

- [x] T001 Inicializar projeto Vite com React em `src/` (remover boilerplate desnecessário)
- [x] T002 [P] Instalar dependências: React 18, React Router 6, Tailwind CSS 3
- [x] T003 [P] Configurar Tailwind CSS em `src/styles/globals.css` com imports obrigatórios
- [x] T004 [P] Criar estrutura de pastas base: `src/components/`, `src/pages/`, `src/hooks/`, `src/utils/`, `public/data/`
- [x] T005 Configurar React Router com rotas preliminares em `src/App.jsx` (home + artigo)
- [x] T006 [P] Criar arquivo de dados mockados em `public/data/news.json` (ver template em quickstart.md)
- [x] T007 Validar que `npm run dev` executa e navegador abre em http://localhost:5173

**Checkpoint**: Estrutura base pronta; hot reload funcional; pronto para implementar componentes

---

## Phase 2: Foundational Components & Data Loading

Implementar componentes base reutilizáveis e hook de carregamento de dados.

**Goal**: Infraestrutura de dados e componentes funcionando; pronto para uso em user stories

**Independent Test**: Hook `useNews` carrega dados sem erro; componentes aceitam props e renderizam sem warnings

- [x] T008 [P] Criar hook `useNews` em `src/hooks/useNews.js` para carregar JSON local (fetch com error handling)
- [x] T009 [P] Criar componente `NewsCard.jsx` em `src/components/` (notícia individual em card)
  - Props: news objeto
  - Renderiza: imagem, título (truncado max 2 linhas), autor, link "Ler mais"
  - Classes Tailwind para border, hover, spacing
- [x] T010 [P] Criar componente `NewsFeatured.jsx` em `src/components/` (manchete principal)
  - Props: news objeto
  - Renderiza: imagem grande, título, resumo, autor, data, fonte (link)
  - Layout 2-coluna em desktop (imagem + texto), 1-coluna em mobile
  - Classes Tailwind
- [x] T011 [P] Criar componente `NewsGrid.jsx` em `src/components/` (grid de notícias)
  - Props: array de notícias
  - Renderiza lista de NewsCard em grid responsivo
  - Grid 1 coluna (mobile) → 2 (tablet) → 4 (desktop) com Tailwind breakpoints
  - Espaçamento consistente
- [x] T012 [P] Criar página `src/pages/Home.jsx` que monta componentes
  - Carrega dados via `useNews`
  - Monta NewsFeatured + NewsGrid
  - Estados: loading, error, success
- [x] T013 Criar página `src/pages/Article.jsx` (placeholder para página de artigo individual)
  - Aceita slug via React Router params
  - Renderiza: título, imagem, conteúdo mockado (demo apenas)
- [x] T014 [P] Criar constantes em `src/utils/constants.js` (cores, breakpoints, textos de erro)
- [x] T015 Integrar Home e Article em rodas do Router (`src/App.jsx`)

**Checkpoint**: Home página carrega dados e exibe componentes base sem erros; clickable; pronto para refinamento

---

## Phase 3: User Story 1 - Visualizar Manchete Principal (P1)

Implementar a manchete principal com destaque visual, imagem responsiva e link funcional.

**Goal**: Manchete carrega no topo da home com imagem, título e élink clicável para página de artigo

**Independent Test**: 
- Carregar home; verificar manchete exibida acima de outros conteúdos
- Clique em manchete leva para `/noticias/[slug]`
- Imagem redimensiona corretamente em mobile/tablet/desktop
- Textos legíveis em todos os tamanhos

- [x] T016 [P] [US1] Refinar componente `NewsFeatured.jsx` visualmente com Tailwind
  - Fundo escuro (gray-900 ou azul escuro) para contraste visual
  - Imagem larga, proporção 16:9 ou 2:1
  - Texto branco; títulos em h1, tamanho 3xl-4xl
  - Espaçamento interno (px-4 py-12) para respiração visual
  - Links com cor diferenciada (blue-600 hover:blue-700)
- [x] T017 [P] [US1] Adicionar responsividade completa a `NewsFeatured.jsx`
  - Desktop: Grid layout 2 colunas (imagem 50% + texto 50%)
  - Tablet: Ainda 2 colunas mas com proporções ajustadas
  - Mobile: Stack vertical (imagem acima, texto abaixo)
  - Quebra de linha em md: (md:grid-cols-2)
- [x] T018 [P] [US1] Implementar lazy loading de imagem de manchete com fallback
  - Propriedades obrigatórias: width, height (evita CLS)
  - `loading="eager"` (carrega rapidamente, é manchete)
  - Fallback SVG placeholder se imagem falhar
  - `onError` handler mostra placeholder na falha
- [x] T019 [US1] Adicionar atributo `alt` descritivo obrigatório em imagem (WCAG AA A11y)
  - `alt={news.imagemAlt}` vindo do JSON
  - Validar no console que não há imagens sem alt
- [x] T020 [P] [US1] Implementar link funcional no título e imagem
  - Ambos devem levar para `Link to="/noticias/${news.slug}"`
  - Testar navegação: clique deve levara page de artigo
  - React Router params já configurado em App.jsx
- [x] T021 [P] [US1] Adicionar byline completo (autor + data + fonte)
  - Exibir: "{Autor} • {data formatada} • [Fonte original]"
  - Data em formato amigável: "1 de abril de 2026"
  - Fonte como link externo (`<a href={source} target="_blank">`)
  - Classes de texto reduzido (text-sm) para contraste com título
- [x] T022 [US1] Testar acessibilidade da manchete
  - Verificar contraste: 4.5:1 entre texto branco e fundo
  - Testar navegação por teclado: Tab alcança título e links
  - usar `<article>` tag semântica wrapper
  - Rodar Lighthouse Accessibility check (target > 90)

**Checkpoint**: User Story 1 pronta; manchete renderizada responsivamente, acessível, com cliques funcionais

---

## Phase 4: User Story 2 - Grade de Notícias Secundárias (P1)

Implementar grid de notícias abaixo da manchete com layout responsivo e lazy loading.

**Goal**: Grid de 4+ notícias em desktop, reduz para 1-2 em mobile; imagens lazy-loaded, links funcionais

**Independent Test**: 
- Home carrega com grid abaixo da manchete
- Desktop: 4 colunas com 4 notícias visíveis (mínimo)
- Mobile: 1 coluna, múltiplas notícias scrolláveis
- Clique em card leva para `/noticias/[slug]`
- Imagens lazy-load sem layout shift (CLS)

- [x] T023 [P] [US2] Refinar componente `NewsCard.jsx` visualmente
  - Border cinza claro, rounded corners, overflow hidden
  - Imagem topo do card, altura fixa (h-48)
  - Título máximo 2 linhas com `line-clamp-2` Tailwind
  - Autor em texto menor (text-sm text-gray-600)
  - "Ler mais →" link em azul, hover com underline
  - Espaçamento interno p-4
- [x] T024 [P] [US2] Implementar lazy loading em NewsCard
  - `loading="lazy"` em imagem (carrega quando perto da viewport)
  - Width/height obrigatórios para evitar CLS
  - Placeholder cinza genérico enquanto carrega
- [x] T025 [P] [US2] Adicionar hover effect em NewsCard
  - Sombra ao hover: `hover:shadow-lg`
  - Transição suave: `transition`
  - Efeito visual sutil, não intrusivo
- [x] T026 [P] [US2] Implementar grid responsivo em `NewsGrid.jsx`
  - Mobile: `grid-cols-1` (1 coluna)
  - Tablet: `md:grid-cols-2` (2 colunas em up)
  - Desktop: `lg:grid-cols-4` (4 colunas em up) OU `lg:grid-cols-3` (3 se 4 for muito aperto)
  - Gap consistente: `gap-6`
  - Max-width container: `max-w-6xl mx-auto px-4 py-12`
- [x] T027 [P] [US2] Adicionar heading "Notícias do dia" antes do grid
  - `<h2>` semântico
  - Tamanho: `text-3xl font-bold`
  - Margin bottom: `mb-8` para respiração
  - Classes Tailwind
- [x] T028 [P] [US2] Validar dados de notícias secundárias
  - Cada card tem `id`, `slug`, `titulo`, `imagem`, `imagemAlt`, `autor`
  - Renderizar mínimo 4 notícias em JSON `public/data/news.json`
  - Se menos de 4, app não quebra (map sobre array vazio é OK)
- [x] T029 [US2] Testar cliques em cards
  - Cada card é clicável em `<Link to={...}>`
  - Navegação para página de artigo funciona
  - Slug é extraído do URL corretamente
- [x] T030 [P] [US2] Adicionar `alt` obrigatório em imagens de cards
  - `alt={news.imagemAlt}` vindo do JSON
  - Validar que nenhum card fica sem alt text

**Checkpoint**: User Story 2 pronta; grid responsivo, lazy-loaded, links funcionais; home oferece múltiplos pontos de entrada

---

## Phase 5: User Story 3 - Organização Visual Clara (P2)

Refinar hierarquia visual, acessibilidade avançada e validar conformidade WCAG AA.

**Goal**: Home tem hierarquia visual óbvia (manchete >> notícias); acessibilidade WCAG AA completa; navegação por teclado 100% funcional

**Independent Test**: 
- Manchete é visualmente dominante (maior, cores mais fortes)
- Proporções de tamanho mantidas em todos os breakpoints
- Tab key navega em ordem lógica (manchete → grid)
- Lighthouse Accessibility ≥ 90
- Contraste 4.5:1 em todos os textos (WCAG AA)

- [x] T031 [P] [US3] Reforçar hierarquia visual de tamanhos
  - Manchete: h1 text-4xl md:text-5xl
  - Grid heading: h2 text-3xl
  - Card titles: h3 text-lg (dentro de NewsCard)
  - Validar proporcionalidade em mock-ups ou navegador
- [x] T032 [P] [US3] Validar e refinar paleta de cores para contraste WCAG AA
  - Usar Tailwind colors com contraste conhecido
  - Exemplo: text-gray-900 (preto ~#111) em bg-white = 19:1 ✅
  - Exemplo: text-white em bg-gray-900 (escuro ~#111) = 16:1 ✅
  - Validar manualmente em DevTools (Inspect → Computed Styles → Color Contrast)
  - Se usar cores customizadas, validar com WebAIM Contrast Checker
- [x] T033 [P] [US3] Implementar navegação por teclado completamente funcional
  - Tab navega através de: manchete → manchete links → grid cards → article links
  - Enter abre links/artigos
  - Esc pode fechar modals (se implementar depois)
  - Testable: abrir DevTools, desabilitar mouse, navegar com keyboard apenas
  - Validar ordem com `tabindex` (use apenas se necessário; ordem HTML é preferida)
- [x] T034 [P] [US3] Adicionar ARIA labels onde necessário (acessibilidade)
  - Links: natural (React Router links com router text)
  - Images: `alt` já obrigatório (não precisa aria-label)
  - Section/article tags semânticas (não precisa role)
  - Se tiver buttons customizados depois, adicionar `aria-label`
- [x] T035 [P] [US3] Validar semântica HTML em toda a home
  - `<main>` wrappinger conteúdo principal
  - `<article>` para manchete
  - `<section>` para grid
  - `<header>` para cabeçalho (se implementado)
  - `<footer>` para rodapé (se implementado)
  - Sem `<div>` onde semântica é melhor
- [x] T036 [US3] Rodar Lighthouse Accessibility audit
  - Comando: DevTools → Lighthouse → Accessibility
  - Target: score ≥ 90/100
  - Documentar issues encontradas e corrigir iterativamente
  - Screenshot do resultado no PR
- [x] T037 [P] [US3] Validar proporções responsivas em 3 breakpoints
  - Mobile (375px): 1 coluna grid, manchete 1 coluna
  - Tablet (768px): manchete 2 col, grid 2 col
  - Desktop (1024px+): manchete 2 col, grid 4 col
  - Usar browser DevTools → Responsive Design Mode

**Checkpoint**: Home oferece experiência acessível WCAG AA; hierarquia visual clara em todos os devices; navegação por teclado 100% funcional

---

## Phase 6: Performance Validation & Cross-Browser Testing

Medir e otimizar performance; validar compatibilidade.

**Goal**: FCP < 1.5s em 3G; CLS < 0.1; compatível com Chrome, Firefox, Safari (últimas 2 versões)

**Independent Test**: 
- Lighthouse Performance ≥ 80
- Nexus 5 (3G throttling): page interactive < 3s
- CLS < 0.1 (no layout shift visual)
- All major browsers render without errors

- [x] T038 [P] Performance: Medir FCP (First Contentful Paint) em 3G
  - DevTools → Network → Throttle "Slow 3G"
  - Hard reload (Ctrl+Shift+R)
  - Verificar DCP no Performance tab
  - Target: < 1.5s
  - Se acima, investigar: JS bundle size, imagem manchete grande, JSON parsing
- [x] T039 [P] Performance: Validar CLS (Cumulative Layout Shift)
  - Lighthouse → Performance → CLS metric
  - Target: < 0.1
  - Comum: imagens sem width/height (já fixado em T018)
  - Se problema, revisar Tailwind Grid e positions
- [x] T040 [P] Performance: Executar Lighthouse Full Audit
  - DevTools → Lighthouse → "Generate report"
  - Target: Performance ≥ 80, Accessibility ≥ 90, Best Practices ≥ 90
  - Documentar scores; screenshot no repositório (para referência futura)
- [x] T041 [P] Performance: Minificação e bundling via Vite
  - Executar: `npm run build`
  - Verificar que bundle em `/dist` é < 200KB (JS+CSS minificado)
  - Se acima, analisar: `npm run build -- --report` (ver breakdown)
- [x] T042 [P] Cross-browser: Testar em Chrome (versão atual)
  - Verificar layout, imagens, links funcionando
  - DevTools console sem erros
- [x] T043 [P] Cross-browser: Testar em Firefox (versão atual)
  - Mesmo checklist que Chrome
  - Validar Tailwind compatibilidade (flexbox, grid, etc)
- [x] T044 [P] Cross-browser: Testar em Safari (versão atual ou BrowserStack)
  - Validar layout (Safari às vezes comporta-se diferente com grid)
  - Checar imagens, hover states
- [x] T045 Documentar resultados de testes
  - Criar ou atualizar `specs/001-exibicao-home/checklists/qa-results.md`
  - Incluir scores Lighthouse, browsers testados, issues encontradas

**Checkpoint**: Home atende todos os critérios de sucesso (FCP, CLS, Lighthouse, browsers)

---

## Phase 7: Polish & Documentation

Limpeza final, validação de requisitos e documentação.

**Goal**: Code review pronto; README atualizado; função completa e entregável

**Independent Test**: 
- Todos os requisitos funcionais verificáveis
- Código limpo sem warnings; console limpo
- README documenta como rodar e testar
- PR pronto para merge

- [x] T046 [P] Code cleanup
  - Remover console.logs, comentários mortos
  - Organizar imports (não usados removidos)
  - Consistent formatting (Prettier se configurado)
- [x] T047 [P] Validar todos os requisitos funcionais checados
  - FR-001: Manchete exibida ✓
  - FR-002: Grid de 4+ notícias em desktop ✓
  - FR-003: Layout responsivo ✓
  - FR-004: Links funcionais ✓
  - FR-005: Imagens obrigatórias com fallback ✓
  - FR-006: Contraste WCAG AA ✓
  - FR-007: Navegação por teclado ✓
- [x] T048 Atualizar README do projeto (ou QUICKSTART)
  - Como instalar dependências
  - Como rodar dev server
  - Como fazer build production
  - Como testar acessibilidade e performance
  - Link para specs/001-exibicao-home/quickstart.md
- [x] T049 [P] Verificar que não há console errors em desenvolvimento
  - `npm run dev`
  - Abrir DevTools Console
  - Hard reload (Ctrl+Shift+R)
  - Verificar: 0 errors, warnings são OK se forem avisos de dependências
- [x] T050 Criar resumo de testes manuais em checklist
  - Arquivo: `specs/001-exibicao-home/checklists/manual-qa.md`
  - Template: Checklist completo com todas validações executadas
    ```
    ## Manual QA Checklist
    
    - [ ] Home carrega sem erros
    - [ ] Manchete visível no topo
    - [ ] Grid de notícias abaixo
    - [ ] Clique em notícia leva para artigo
    - [ ] Responsive em mobile
    - [ ] Acessibilidade keyboard
    ...
    ```

**Checkpoint**: Feature completa, testada, pronta para entrega

---

## Phase 8: Final Validation (Optional Enhancements)

Refinamentos finais não-obrigatórios; melhorias que agregam valor.

**Goal**: Polish fino; user experience premium (se tempo permitir)

- [x] T051 [P] (OPCIONAL) Adicionar skeleton loaders enquanto loading
  - Placeholder cinzento animado enquanto dados carregam
  - Use biblioteca small (ex: `react-loading-skeleton` ~1KB gzip) ou CSS puro
- [x] T052 [P] (OPCIONAL) Implementar error boundary
  - Capturar erros de componentes quebrados
  - Exibir fallback gracioso (página de erro bonita)
- [x] T053 (OPCIONAL) Adicionar SEO meta tags dinâmicas
  - `<title>` da home: "PortalNoticias - Últimas Notícias"
  - `<meta name="description">` com resumo
  - Library: `react-helmet` ou JS nativo em index.html
- [x] T054 (OPCIONAL) Implementar "offline-first" (cache com Service Worker)
  - Workbox para cache de assets
  - Se rede cair, mostrar versão cached
- [x] T055 (OPCIONAL) Google Analytics ou telemetria simples
  - Track page views de home e cliques em notícias
  - Insights de user behavior

---

## Dependencies & Parallel Execution

### Critical Path (Must Execute in Order)

```
T001-T007 (Setup) 
  ↓
T008-T015 (Foundational)
  ↓
T016-T022 (US1 Manchete)
  ├─ T023-T030 (US2 Grid) — pode rodar paralelo com US1
  ├─ T031-T037 (US3 Organização) — dependente de T022/T030
  └─ T038-T045 (Performance)
    ↓
    T046-T050 (Polish)
```

### Parallelization Opportunities Within Each Phase

**Phase 1**: Todos `[P]` podem rodar paralelo após T001 (setup base)

**Phase 2**: T008-T015 todos `[P]` (componentes independentes)

**Phase 3-US1**: T016-T021 todos `[P]` depois de T022 semântica

**Phase 4-US2**: T023-T029 todos `[P]` (componentes, não dependem de T016-T022)

**Phase 5-US3**: T031-T035 todos `[P]`; T036 sequencial após T035

**Phase 6**: T038-T044 todos `[P]`; T045 após testes

---

## Success Metrics

| Métrica | Target | Verificado |
|---------|--------|-----------|
| FCP em 3G | < 1.5s | Lighthouse Audit |
| CLS | < 0.1 | Lighthouse Audit |
| Lighthouse Performance | ≥ 80/100 | DevTools → Lighthouse |
| Lighthouse Accessibility | ≥ 90/100 | DevTools → Lighthouse |
| WCAG AA Contrast | ≥ 4.5:1 textos | WebAIM Checker |
| Cross-browser | Chrome, Firefox, Safari OK | Manual testing |
| JS Bundle | < 200KB | `npm run build` check |
| Requisitos funcionais | 7/7 | Feature spec checklist |

---

## Summary

| Fase | Tarefas | Duração Est. | Paralelizável? |
|------|---------|-------------|----------------|
| Phase 1 Setup | T001-T007 | 1h | Sim (depois T001) |
| Phase 2 Foundational | T008-T015 | 2-3h | Sim |
| Phase 3 US1 Manchete | T016-T022 | 2-3h | Parcialmente |
| Phase 4 US2 Grid | T023-T030 | 2-3h | Sim (paralelo US1) |
| Phase 5 US3 Visual | T031-T037 | 1-2h | Sim (depois US1+US2) |
| Phase 6 Performance | T038-T045 | 1-2h | Sim |
| Phase 7 Polish | T046-T050 | 1-2h | Parcialmente |
| Phase 8 (Opcional) | T051-T055 | 1-2h | Sim (opcional) |
| **Total MVP** | **T001-T022** | **~5-7h** | ✅ Entregável |
| **Total Completo** (US1+US2+US3) | **T001-T050** | **~12-15h** | ✅ Robusto |

---

## Próximos Passos

1. ✅ **Especificação**: spec.md definido
2. ✅ **Planejamento**: plan.md + research.md validados
3. ✅ **Design**: data-model.md + quickstart.md prontos
4. ✅ **TASKS**: Este arquivo (tasks.md) ← você está aqui
5. ⏳ **Implementação**: Começar T001 (Setup)
6. ⏳ **Code Review**: Validar contra spec
7. ⏳ **QA**: Executar PT phase 6-7
8. ⏳ **Merge**: PR → main branch

---

**Version**: 1.0 | **Date**: 2026-04-01 | **Status**: Ready for Implementation

**How to Use This Document**:
- Para começar: vá para **Phase 1**, comece com T001
- Para planejar sprints: use o quadro de duração/paralelização acima
- Para validar completude: marque `[x]` conforme completa cada task
- Para rastrear bloqueadores: documente em comentários ao lado de cada task

---

## Format Validation

✅ **Todas as tasks seguem o formato obrigatório**:
```
- [ ] [TaskID] [P?] [Story?] Description com file path
```

**Exemplos**:
- ✅ `- [ ] T001 Inicializar projeto Vite com React em `src/`
- ✅ `- [ ] T008 [P] Criar hook useNews em src/hooks/useNews.js`
- ✅ `- [ ] T016 [P] [US1] Refinar componente NewsFeatured.jsx`
- ✅ `- [ ] T022 [US1] Testar acessibilidade da manchete`

**Verificação de Completude**:
- ✅ 55 tasks geradas (T001-T055)
- ✅ Phase 1 Setup: 7 tasks
- ✅ Phase 2 Foundational: 8 tasks
- ✅ Phase 3 US1: 7 tasks
- ✅ Phase 4 US2: 8 tasks
- ✅ Phase 5 US3: 7 tasks
- ✅ Phase 6 Performance: 8 tasks
- ✅ Phase 7 Polish: 5 tasks
- ✅ Phase 8 Opcional: 5 tasks
- ✅ Todos tasks têm file paths claros
- ✅ Todos tasks são independentemente testáveis
- ✅ Parallelization marcada com [P]
- ✅ User stories marcadas com [US1], [US2], [US3]

**Status**: ✅ READY FOR IMPLEMENTATION
