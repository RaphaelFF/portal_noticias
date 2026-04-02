# Tasks: Layout da Manchete Principal (Feature 004)

**Total de Tasks**: 12  
**Tempo Estimado**: 16-20 horas  
**Branch**: `004-layout-manchete`

---

## 🔧 Setup (Fase 1)

### SETUP-001: Criar estrutura base de componentes
- [ ] Criar `src/components/FeaturedCarousel.jsx`
- [ ] Criar `src/components/FeaturedSidebar.jsx`
- [ ] Criar `src/components/FeaturedCarouselControls.jsx`
- [ ] Importar em `NewsFeatured.jsx`

**Estimativa**: 1h  
**Dependências**: Nenhuma

---

### SETUP-002: Refatorar NewsFeatured.jsx
- [ ] Remover layout grid existente
- [ ] Adaptar para usar novos componentes
- [ ] Manter interface de props (news)
- [ ] Validar PropTypes

**Estimativa**: 1h  
**Dependências**: SETUP-001

---

## 🎨 Design (Fase 1-2)

### DESIGN-001: Implementar estilos base do carrossel
- [ ] Layout container (grid 2fr 1fr)
- [ ] Estilos do carrossel (500px height, border-radius, overflow)
- [ ] Background image + cover
- [ ] Gradiente negro na base

**Estimativa**: 2h  
**Dependências**: SETUP-002

---

### DESIGN-002: Implementar estilos da sidebar
- [ ] Layout flex vertical
- [ ] 2 items com 50% height cada
- [ ] Background images
- [ ] Gradientes

**Estimativa**: 1.5h  
**Dependências**: DESIGN-001

---

### DESIGN-003: Estilos dos textos sobrepostos
- [ ] Posicionamento absolute (bottom-left)
- [ ] Tipografia (title, summary, byline)
- [ ] Cores e opacidade
- [ ] Z-index correto

**Estimativa**: 1h  
**Dependências**: DESIGN-001

---

## ⚙️ Lógica (Fase 2)

### LOGIC-001 [P]: Implementar estado do carrossel
- [ ] Hook `useState(currentSlide)`
- [ ] Função `nextSlide()`
- [ ] Função `prevSlide()`
- [ ] Validação de índices (cyclic)

**Estimativa**: 2h  
**Dependências**: SETUP-002

---

### LOGIC-002 [P]: Componente CarouselControls
- [ ] Botões anterior/próxima com React Icons
- [ ] Click handlers
- [ ] Hover effects
- [ ] Accessibility (aria-labels)

**Estimativa**: 1.5h  
**Dependências**: LOGIC-001

---

### LOGIC-003 [P]: Renderização dinâmica de slides
- [ ] Renderizar slide atual em FeaturedCarousel
- [ ] Transição suave (opacity fade)
- [ ] Passar dados via props
- [ ] Evitar re-renders desnecessários (useMemo)

**Estimativa**: 1.5h  
**Dependências**: DESIGN-001 + LOGIC-001

---

### LOGIC-004: Auto-play do carrossel
- [ ] useEffect para interval
- [ ] Pausar ao hover
- [ ] Pausar ao click (opcional)
- [ ] Cleanup do interval

**Estimativa**: 1.5h  
**Dependências**: LOGIC-001

---

## 📱 Responsividade (Fase 3)

### RESPONSIVE-001: Mobile (< 640px)
- [ ] Layout empilhado (1 coluna)
- [ ] Carrossel + Sidebar em sequência
- [ ] Altura ajustada
- [ ] Teste em 3 devices

**Estimativa**: 1.5h  
**Dependências**: DESIGN-001 + DESIGN-002

---

### RESPONSIVE-002: Tablet (640px - 1024px)
- [ ] Layout 2 colunas mantido
- [ ] Altura reduzida (350px)
- [ ] Spacing ajustado
- [ ] Teste em breakpoint md

**Estimativa**: 1h  
**Dependências**: RESPONSIVE-001

---

## ♿ Acessibilidade (Fase 3)

### A11Y-001: Aria labels e semantic HTML
- [ ] aria-label nos botões
- [ ] role="region" no carrossel
- [ ] alt-text nas imagens
- [ ] Semantic heading tags

**Estimativa**: 1h  
**Dependências**: LOGIC-002

---

## ✅ QA & Validação (Fase 4)

### QA-001: Testes visuais
- [ ] Desktop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Screenshot comparativo

**Estimativa**: 1.5h  
**Dependências**: Todas as tasks anteriores

---

### QA-002: Performance & Build
- [ ] Executar `npm run build`
- [ ] Verificar tamanho JS/CSS
- [ ] Comparar com baseline
- [ ] Lighthouse audit

**Estimativa**: 1h  
**Dependências**: Todas as tasks anteriores

---

### QA-003: Testes de navegação
- [ ] Testar setas (anterior/próxima)
- [ ] Testar auto-play
- [ ] Testar responsividade
- [ ] Testar em browsers (Chrome, Firefox, Safari)

**Estimativa**: 1.5h  
**Dependências**: LOGIC-002 + LOGIC-004

---

## 📊 Resumo de Execução

### Por Fase

| Fase | Tasks | Horas | Status |
|------|-------|-------|--------|
| Setup | 2 | 2h | 🔄 Not Started |
| Design | 3 | 4.5h | 🔄 Not Started |
| Lógica | 4 | 6.5h | 🔄 Not Started |
| Responsividade | 2 | 2.5h | 🔄 Not Started |
| Acessibilidade | 1 | 1h | 🔄 Not Started |
| QA | 3 | 4h | 🔄 Not Started |
| **TOTAL** | **12** | **20.5h** | 🔄 Not Started |

### Por Prioridade

- 🔴 **Critical (Blocker)**: SETUP-001, SETUP-002, DESIGN-001, LOGIC-001
- 🟡 **High**: DESIGN-002, DESIGN-003, LOGIC-002, LOGIC-003
- 🟢 **Medium**: LOGIC-004, RESPONSIVE-001, A11Y-001
- 🔵 **Low**: RESPONSIVE-002, QA-001, QA-002, QA-003

---

## 🔗 Dependências Entre Tasks

```
SETUP-001
   ↓
SETUP-002
   ↓
├─ DESIGN-001 ──┬─ LOGIC-001 ──┬─ LOGIC-002
│               │               │
└─ DESIGN-002   └─ LOGIC-003    ├─ LOGIC-004
                                 │
                    DESIGN-003 ──┤
                                 │
                    RESPONSIVE-001
                                 │
                    RESPONSIVE-002
                                 │
                    A11Y-001 ─────┤
                                 │
                    QA-001 ──────┤
                    QA-002 ──────┤
                    QA-003 ──────┘
```

---

## 📝 Histórico

| Data | Task | Mudança |
|------|------|---------|
| 2026-04-02 | - | Task list criada |
