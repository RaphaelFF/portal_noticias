# Feature 003 - Seções de Categorias: Tasks & Checklist

**Last Updated**: 2026-04-02  
**Status**: Draft - Ready for Sprint Planning

---

## 📋 Task Breakdown

Este documento lista todas as tasks necessárias para completar a Feature 003, divididas por categoria e estimativas.

---

## 🎯 Epic: Adicionar Seções de Categorias na Home

### Phase 1: Setup & Planning (1 dia)

- [ ] **SETUP-001** | Review da Spec e Plan (30 min)
  - Ler spec.md, plan.md, quickstart.md
  - Elucidar dúvidas técnicas
  - Aprovação do stakeholder
  - Status: PENDING

- [ ] **SETUP-002** | Criar branch de feature (15 min)
  - Branch: `003-secoes-categorias`
  - Base: `main` (Feature 002 já merged)
  - Notificar squad
  - Status: PENDING

- [ ] **SETUP-003** | Configurar Tailwind colors customizadas (se necessário) (30 min)
  - Verificar se verde/amarelo/azul Brasil já estão em `tailwind.config.js`
  - Se não, adicionar custom colors
  - Testar aplicação
  - Status: PENDING

---

## 🛠️ Phase 2: Implementation (2-3 dias)

### Task Block: Componente CategorySection

- [ ] **COMP-001** | Criar `src/components/CategorySection.jsx` (2–3 horas)
  - [ ] Receber props: `category` (string), `featuredNewsId` (number)
  - [ ] Usar hook `useNewsByCategory(category, { exclude_ids: [featuredNewsId] })`
  - [ ] Estados: loading, error, items
  - [ ] Renderizar H2 com título da categoria
  - [ ] Renderizar grid dinâmico de cards
  - [ ] Renderizar link "Ver todas"
  - [ ] Aplicar classes Tailwind (cores, spacing, responsive)
  - Acceptance: Componente renderiza sem erros, props funcionam corretamente
  - Estimate: 2-3 horas
  - Status: PENDING

- [ ] **COMP-002** | Criar `src/components/CategorySkeleton.jsx` (1 hora) [OPCIONAL]
  - [ ] 4 skeleton placeholders em grid layout
  - [ ] Animação suave de pulse/loading
  - [ ] Mesmo aspect ratio que NewsCard
  - Acceptance: Aparece durante loading, suave sem piscar
  - Estimate: 1 hora
  - Status: PENDING

### Task Block: Integração Home

- [ ] **INT-001** | Modificar `src/pages/Home.jsx` (1-2 horas)
  - [ ] Importar `useNews()` e extrair `featuredNews`
  - [ ] Importar `CATEGORIES` de constants
  - [ ] Importar novo `CategorySection`
  - [ ] Adicionar loop sobre CATEGORIES
  - [ ] Renderizar `<CategorySection>` para cada categoria
  - [ ] Passar `featuredNews.id` para excluir duplicação
  - [ ] Aplicar spacing entre seções (48px / 3rem)
  - [ ] Testar renderização básica
  - Acceptance: Home renderiza incluindo 8 seções sem erros
  - Estimate: 1-2 horas
  - Status: PENDING

### Task Block: Hook Extend (se necessário)

- [ ] **HOOK-001** | Extend `src/hooks/useNewsByCategory.js` (1-2 horas) [CONDICIONAL]
  - [ ] Verificar se hook atual suporta `exclude_ids` parameter
  - [ ] Se não, adicionar parâmetro `exclude_ids` (array)
  - [ ] Filtrar notícias excluindo IDs passados
  - [ ] Adicionar `useMemo` wrapper para otimização
  - [ ] Manter compatibilidade com versão anterior
  - [ ] Testar filtração isolada
  - Acceptance: Hook retorna notícias corretas, excluir IDs funciona
  - Estimate: 1-2 horas (depende do código atual)
  - Status: PENDING [AFTER REVIEW]

### Task Block: Styling

- [ ] **STYLE-001** | Aplicar Design System no CategorySection (1 hora)
  - [ ] Cores (verde Brasil #228B22 em H2, amarelo em botão, etc)
  - [ ] Tipografia (H2 24px bold, body 16px, label 12px)
  - [ ] Spacing (48px entre seções, 16px entre cards, 24px padding)
  - [ ] Backgrounds alternados (branco/cinza)
  - [ ] Badge categoria (amarelo bg, azul text)
  - [ ] Button "Ver todas" (hover effect amarelo)
  - [ ] Testar em Desktop 1200px
  - Acceptance: Cores, tipografia, spacing exatamente conforme Design System
  - Estimate: 1 hora
  - Status: PENDING

- [ ] **STYLE-002** | Responsividade (1 hora)
  - [ ] Mobile layout (1 coluna, grid-cols-1)
  - [ ] Tablet layout (2 colunas, md:grid-cols-2)
  - [ ] Desktop layout (4 colunas, lg:grid-cols-4)
  - [ ] Testar em 375px, 768px, 1024px, 1440px
  - [ ] Sem horizontal scroll
  - [ ] Imagens mantêm aspect ratio 16:9
  - Acceptance: Layout responsivo 100%, testado em 4+ viewports
  - Estimate: 1 hora
  - Status: PENDING

---

## 🧪 Phase 3: Testing (1-2 dias)

### Task Block: Unit Tests

- [ ] **TEST-001** | Unit test para `CategorySection.jsx` (1,5 horas)
  - [ ] Teste renderização com props válidas
  - [ ] Teste estado loading (skeleton aparece)
  - [ ] Teste estado error (mensagem gentil)
  - [ ] Teste estado vazio (mensagem nenhuma notícia)
  - [ ] Teste renderização de cards (4 max)
  - [ ] Teste link "Ver todas" com href correto
  - Acceptance: Testes passam com cobertura > 90%
  - Estimate: 1,5 horas
  - Status: PENDING

- [ ] **TEST-002** | Unit test para hook `useNewsByCategory` (1 hora) [CONDICIONAL]
  - [ ] Teste filtragem por categoria
  - [ ] Teste `exclude_ids` parameter
  - [ ] Teste top 4 notícias (descending date)
  - [ ] Teste categoria sem notícias
  - Acceptance: Testes passam, hook funciona como esperado
  - Estimate: 1 hora
  - Status: PENDING [IF MODIFIED]

### Task Block: Integration Tests

- [ ] **TEST-003** | Integration test para Home (1 hora)
  - [ ] Home renderiza com 8 seções visíveis
  - [ ] Manchete não aparece em nenhuma seção
  - [ ] Sem duplicações de ID em todas as seções
  - [ ] Seções em ordem correta (CATEGORIES order)
  - Acceptance: Testes passam, sem erros de console
  - Estimate: 1 hora
  - Status: PENDING

### Task Block: Visual & Responsive Tests

- [ ] **TEST-004** | Visual Regression (1 hora)
  - [ ] Screenshot desktop (1200px)
  - [ ] Screenshot tablet (800px)
  - [ ] Screenshot mobile (375px)
  - [ ] Comparar com design aprovado
  - [ ] Verificar cores, spacing, tipografia
  - Acceptance: Screenshots se alinham com Design System, variações de viewport OK
  - Estimate: 1 hora
  - Status: PENDING

- [ ] **TEST-005** | Responsive Test manual (30 min)
  - [ ] DevTools inspeção em 375px, 768px, 1024px, 1440px
  - [ ] Verificar ausência de horizontal scroll
  - [ ] Validar proporcionalidade de elementos
  - [ ] Testar em 2-3 navegadores (Chrome, Firefox, Safari)
  - Acceptance: Layout perfeito em todos os breakpoints
  - Estimate: 30 min
  - Status: PENDING

### Task Block: Accessibility Tests

- [ ] **ACC-001** | Lighthouse Audit (30 min)
  - [ ] Rodar Lighthouse em DevTools
  - [ ] Target: Accessibility score > 90, Performance > 80
  - [ ] Resolver críticas (contraste, aria, etc)
  - [ ] Validar FCP < 1.5s
  - Acceptance: Lighthouse score > 90 accessibility, > 80 performance
  - Estimate: 30 min
  - Status: PENDING

- [ ] **ACC-002** | axe Accessibility Scan (30 min)
  - [ ] Instalar axe DevTools (extension)
  - [ ] Rodar scan na Home
  - [ ] Target: 0 críticos, max 2 menores
  - [ ] Resolver ou documenter violações
  - Acceptance: axe scan retorna 0 críticos
  - Estimate: 30 min
  - Status: PENDING

- [ ] **ACC-003** | Manual Keyboard Navigation (30 min)
  - [ ] Tab through todas seções
  - [ ] Testar Enter/Space em links
  - [ ] Verificar ordem lógica (sem jumps)
  - [ ] Verificar foco visível em todos elementos
  - Acceptance: Navegação por teclado 100% funcional
  - Estimate: 30 min
  - Status: PENDING

- [ ] **ACC-004** | Screen Reader Test (1 hora)
  - [ ] NVDA (Windows) ou JAWS:
    - [ ] Leitor consegue navegar página
    - [ ] Headings são anunciados corretamente (H1, H2, H3)
    - [ ] Links têm texto descritivo ("Ver todas as notícias de Economia")
    - [ ] Cards são anunciados como artigos/items
  - [ ] VoiceOver (Mac) - teste básico se disponível
  - Acceptance: Screen reader consegue ler e navegar página corretamente
  - Estimate: 1 hora
  - Status: PENDING

### Task Block: Performance Tests

- [ ] **PERF-001** | Performance Testing com Lighthouse CI (30 min)
  - [ ] Simulate 3G (400ms latência, 1.6Mbps)
  - [ ] Medir FCP, LCP, CLS, TTI
  - [ ] Target: FCP < 1.5s, CLS < 0.1, LCP < 2.5s
  - [ ] Ajustar lazy loading se necessário
  - Acceptance: Todas métricas dentro target
  - Estimate: 30 min
  - Status: PENDING

- [ ] **PERF-002** | Bundle Size Analysis (30 min)
  - [ ] Rodar `npm run build`
  - [ ] Comparar novo bundle size com anterior
  - [ ] Target: Aumento < 5%
  - [ ] Usar `npm run build -- --visualize` se necessário
  - Acceptance: Bundle size aumento < 5%
  - Estimate: 30 min
  - Status: PENDING

- [ ] **PERF-003** | Manual Performance Inspection (30 min)
  - [ ] Open DevTools → Performance tab
  - [ ] Record scroll através da página
  - [ ] Verificar FPS (ideal 60)
  - [ ] Verificar absence de jank/stuttering
  - [ ] Analisar layout shifts
  - Acceptance: Smooth 60fps scroll, CLS < 0.1
  - Estimate: 30 min
  - Status: PENDING

---

## 📦 Phase 4: Review & Refinement (1 dia)

- [ ] **REF-001** | Code Review (1 hora)
  - [ ] Submeter PR com descrição clara
  - [ ] Pedir review de no mínimo 2 desenvolvedores
  - [ ] Endereçar comentários (se houver)
  - [ ] Verificar CI checks (tests, linting)
  - Acceptance: PR aprovada com 2+ approvals
  - Estimate: 1 hora (espera na maioria)
  - Status: PENDING

- [ ] **REF-002** | QA Sign-off (1 hora)
  - [ ] QA verifica checklist completo
  - [ ] Testa em devices reais (se aplicável)
  - [ ] Valida contra spec e acceptance criteria
  - [ ] Documenta findings/bugs
  - Acceptance: QA dá sinal verde, sem bugs críticos
  - Estimate: 1 hora
  - Status: PENDING

- [ ] **REF-003** | Merge e Deploy (30 min)
  - [ ] Merge branch em `main`
  - [ ] Tag versão se applicable (v0.3.0)
  - [ ] Deploy em staging/production
  - [ ] Validar deployment
  - [ ] Notify stakeholders
  - Acceptance: Código em producção, nenhum erro
  - Estimate: 30 min
  - Status: PENDING

- [ ] **REF-004** | Documentation Update (30 min)
  - [ ] Atualizar README.md se necessário
  - [ ] Adicionar JSDoc comentários em componentes
  - [ ] Atualizar componentes index.js exports
  - [ ] Adicionar exemplos de uso se houver Storybook
  - Acceptance: Documentação atualizada, exemplos claros
  - Estimate: 30 min
  - Status: PENDING

---

## 🐛 Phase 5: Post-Launch (1-2 horas)

- [ ] **MAINT-001** | Monitor Production (1 hora)
  - [ ] Verificar logs para erros
  - [ ] Monitorar performance metrics (Sentry, GTM, etc)
  - [ ] Verificar user feedback
  - [ ] Preparar hotfixes se necessário
  - Acceptance: Nenhum erro crítico relatado
  - Estimate: 1 hora (vigilância)
  - Status: PENDING

- [ ] **MAINT-002** | Post-Mortem & Lessons Learned (1 hora)
  - [ ] Documentar o que funcionou bem
  - [ ] Documentar desafios e soluções
  - [ ] Atualizar playbooks/guidelines se necessário
  - [ ] Compartilhar com squad
  - Acceptance: Documento finalizado, compartilhado
  - Estimate: 1 hora
  - Status: PENDING

---

## 📊 Summary

| Phase | Tasks | Est. Hours | Status |
|-------|-------|-----------|--------|
| Phase 1: Setup | 3 | 1.25 | PENDING |
| Phase 2: Implementation | 8 | 8-10 | PENDING |
| Phase 3: Testing | 10 | 7.5-8 | PENDING |
| Phase 4: Review | 4 | 2.5 | PENDING |
| Phase 5: Post-Launch | 2 | 2 | PENDING |
| **TOTAL** | **27** | **21-23 horas** | PENDING |

**Estimativa de Timeline**:
- **Desenvolvimento**: 2-3 dias (8-10 horas)
- **Testing & QA**: 1-2 dias (7.5-8 horas)
- **Review & Merge**: 1 dia (2.5 horas)
- **TOTAL**: 4-6 dias (equipe de 1-2 devs)

---

## 🎯 Definition of Done

Uma task é considerada **DONE** quando:

1. ✅ Código é escrito, testado localmente
2. ✅ Testes automatizados passam (unit + integration)
3. ✅ Linting sem erros (`eslint .`)
4. ✅ Acessibilidade validada (axe, Lighthouse)
5. ✅ Performance dentro métricas (FCP, CLS, bundle)
6. ✅ Documentação atualizada
7. ✅ Code review aprovado
8. ✅ Merge em main
9. ✅ Deployed e validado
10. ✅ Nenhum erro em production

---

## 📝 Notes & Dependencies

### Blockers
- Nenhum blocker identificado
- Feature 001 e 002 já devem estar em `main`

### Dependencies
- `public/data/news.json` (já existe)
- `src/utils/constants.js` → CATEGORIES (já existe)
- `src/hooks/useNewsByCategory.js()` (já existe, pode precisar extend)
- `src/components/NewsCard.jsx` (reutilizar, não modificar)
- Tailwind config (talvez add custom colors Brasil)

### Risks
- Se `useNewsByCategory` não suportar `exclude_ids`, task **HOOK-001** vira blocker (+1-2 horas)
- Se bundle size crescer > 5%, pode precisar otimizações adicionais
- Se acessibilidade issues críticas descobertas, pode atrasar merge

### Contingency
- Se bloqueado, prioridade: TEST-001 → CODE REVIEW antes de testes pesados
- Se performance ruim, ativar task **PERF-002** e **PERF-003** como prioridade

---

## 👥 Ownership (Sugestão)

- **Dev Lead**: Responsável por COMP-*, INT-*, HOOK-*
- **QA**: Responsável por TEST-*, ACC-*
- **Devops/Tech Lead**: PERF-*, REF-001, REF-002
- **Product**: REF-002, MAINT-001

---

## 🔄 Weekly Check-ins

Sugestão de status update semanal:

- **Seg**: Phase 1 & início Phase 2 (Setup + COMP-001)
- **Qua**: Phase 2 end (COMP-*, INT-*, STYLE-*)
- **Sex**: Phase 3 início (TEST-*, ACC-*)
- **Seg (Week 2)**: Phase 3 end + Phase 4 (Review, Merge)
- **Qua (Week 2)**: Phase 5 (Post-Launch)

---

## ✨ Final Checklist Before Calling DONE

- [ ] Todos as 27 tasks marcadas como DONE
- [ ] Zero uncaught exceptions em console
- [ ] Zero linting errors (`npm run lint`)
- [ ] Todos testes passam (`npm run test`)
- [ ] Lighthouse > 90 (accessibility & performance)
- [ ] axe scan: 0 critical violations
- [ ] Code review aprovado (min 2 approvals)
- [ ] Merged em main
- [ ] Deployed e validado em production
- [ ] Stakeholders notificados
- [ ] Documentação atualizada
- [ ] Post-mortem finalizado

**Feature 003 é DONE quando tudo acima estiver ✅**

