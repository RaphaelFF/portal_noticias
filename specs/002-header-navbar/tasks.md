# Tasks: Header/Navbar - 55 Tarefas Estruturadas

## Organização: 8 Fases

**Total**: 55 tasks | **MVP**: T001-T015 (2-3 dias) | **Full**: T001-T055 (1-2 semanas)

---

## Phase 1: Setup e Estrutura Base (T001-T007)

Preparar projeto para header, criar pastas, configurar rotas.

- [ ] T001 Criar pastas: `src/components/Header/`, `src/hooks/`, `src/styles/`
- [ ] T002 Criar arquivo `src/utils/categories.js` com array de categorias (12 items)
- [ ] T003 [P] Criar arquivo `src/hooks/useMediaQuery.js` (detecta breakpoints)
- [ ] T004 [P] Criar arquivo `src/hooks/useDate.js` (data/hora atualizada)
- [ ] T005 Criar rota nova `GET /categorias/:slug` em React Router
- [ ] T006 [P] Atualizar App.jsx para importar e render Header no topo
- [ ] T007 Remover espaço vazio do topo (se header fica sticky)

**Checkpoint**: Pastas, constantes, hooks, rotas prontas

---

## Phase 2: Componentes Base - Sem Estilos (T008-T015)

Criar componentes React com estrutura HTML semântica, SEM styling yet.

- [ ] T008 [P] Criar `Header.jsx` com estrutura básica (header tag)
  - Renderiza logo (Link para home)
  - Renderiza DateDisplay
  - Renderiza MobileMenu (condicional)
  - Renderiza CategoryMenu (condicional)

- [ ] T009 [P] Criar `MobileMenu.jsx`
  - Props: isOpen, onClose, categories, onCategoryClick
  - Renderiza 12 Links (um para cada categoria)
  - HTML semântico (nav > ul > li)

- [ ] T010 [P] Criar `CategoryMenu.jsx`
  - Props: categories, activeCategory
  - Renderiza links horizontais
  - Indica categoria ativa

- [ ] T011 [P] Criar `DateDisplay.jsx`
  - Exibe data formatada (pt-BR)
  - Usa hook useDate para atualizar

- [ ] T012 Integrar Header.jsx em App.jsx
  - Header fica acima de Routes
  - Tudo renderiza, nada quebra

- [ ] T013 [P] Implementar useMediaQuery hook
  - Detecta `(max-width: 768px)` = mobile
  - Retorna boolean: isMobile
  - Testa em DevTools responsive

- [ ] T014 [P] Implementar useDate hook
  - Retorna data formatada pt-BR
  - Atualiza a cada hora
  - Nunca causa memory leak

- [ ] T015 Testar no navegador
  - Sem console errors
  - Layout básico correto
  - Estados funcionam

**Checkpoint**: Componentes renderizam, mas sem estilos finos

---

## Phase 3: Interatividade Mobile (T016-T022)

Fazer menu hambúrguer funcionar: abrir, fechar, navegar.

- [ ] T016 [P] Estado `isMenuOpen` em Header.jsx
  - Clique hambúrguer: toggle menu
  - Clique em categoria: fecha menu
  - Clique fora: fecha menu (outside click)

- [ ] T017 [P] Implementar click hambúrguer
  - onClick em botão ☰
  - Chama setIsMenuOpen()
  - ARIA: aria-expanded reflete estado

- [ ] T018 [P] Implementar navigation de categorias
  - Clique em categoria navega para `/categorias/[slug]`
  - Usa navigate() do React Router
  - Menu fecha automaticamente

- [ ] T019 [P] Implementar outside click (fechar menu)
  - useEffect com eventListener
  - Detecta click fora do menu
  - Chama onClose

- [ ] T020 Testar responsividade
  - Mobile (375px): hamburger funciona
  - Tablet (768px): transição visual
  - Desktop (1024px): desktop menu visível

- [ ] T021 Testar navegação
  - Clique em categoria → URL muda
  - Volta com botão back → volta pra home
  - Refresh mantém rota

- [ ] T022 [P] Validar ARIA labels
  - Hambúrguer tem aria-label="Menu"
  - aria-expanded reflete isMenuOpen
  - Screen reader consegue navegar

**Checkpoint**: Interatividade completa e acessível

---

## Phase 4: Styling Visual - Header (T023-T030)

Aplicar em Tailwind CSS ao header base.

- [ ] T023 [P] Styling Header container
  - bg-gray-900 (fundo escuro)
  - h-20 mobile / h-32 desktop
  - sticky top-0 z-50
  - px-4 py-3 (mobile) / px-8 py-4 (desktop)

- [ ] T024 [P] Styling Logo
  - text-2xl md:text-3xl font-bold text-white
  - hover:text-blue-400 transition
  - Link (não button!)

- [ ] T025 [P] Styling Date Display
  - text-xs md:text-sm text-gray-400
  - À direita (ml-auto)
  - Mono font (monospace) opcional

- [ ] T026 [P] Styling Hambúrguer
  - text-3xl text-white
  - hover:text-blue-400
  - Cursor pointer
  - Hidden em md:+

- [ ] T027 Styling CategoryMenu (Desktop)
  - Mostrar flex horizontally
  - gap-4 md:gap-6 entre categorias
  - text-sm md:text-base
  - Links com hover:text-blue-400

- [ ] T028 [P] Styling Active Category
  - Borda inferior (border-b-2 border-blue-600)
  - Ou fundo diferente
  - Indica categoria ativa

- [ ] T029 [P] Styling MobileMenu Overlay
  - Fundo semi-transparente (bg-black/50)
  - Menu lateral (w-64, h-screen)
  - Slide-in animation (de esquerda)
  - z-40 (atrás do header)

- [ ] T030 [P] Testing ao vivo
  - Abrir DevTools
  - Testar em 375px, 768px, 1024px
  - Hover effects funcionam
  - Cores alinhadas com design

**Checkpoint**: Header visualmente polido e profissional

---

## Phase 5: Animações & Transições (T031-T037)

Adicionar movimento suave para boa UX.

- [ ] T031 [P] Animação menu hambúrguer
  - Slide-in de cima ou lado
  - Duração: 300ms
  - Easing: ease-in-out

- [ ] T032 [P] Animação hover em links
  - Color change: 200ms
  - Arrow icon (→) move 2px ao hover
  - Transição suave

- [ ] T033 [P] Animação backdrop (mobile)
  - Fade-in (opacity 0 → 1)
  - Duração: 200ms
  - Backdrop-blur opcional

- [ ] T034 Transição responsiva
  - Quando viewport muda 768px
  - Menu mobile fecha automaticamente
  - Desktop menu aparece
  - Sem jump visual

- [ ] T035 [P] Hover estado active
  - Categoria ativa tem glow suave
  - Cor ligeiramente mais brilhante
  - Transição 150ms

- [ ] T036 Testing animações
  - Chrome DevTools animations
  - Performance? (60fps?)
  - Mobile smooth?

- [ ] T037 [P] Remover animações em prefers-reduced-motion
  - Usuários com motion sickness
  - @media (prefers-reduced-motion: reduce)
  - Sem animações se preferência

**Checkpoint**: Animações suaves e acessíveis

---

## Phase 6: Acessibilidade Completa (T038-T045)

WCAG AA compliance total.

- [ ] T038 [P] Keyboard Navigation
  - Tab navega: hambúrguer → logo → date
  - Tab novamente: categorias (se visível)
  - Enter abre/ativa links
  - Sem tab trap (nunca fica preso)

- [ ] T039 [P] ARIA Labels Completos
  - aria-label="Menu" no hambúrguer
  - aria-expanded="false/true" reflete estado
  - aria-hidden em decorativos (•, |)
  - role="navigation" no menu

- [ ] T040 [P] Contraste de Cores
  - White em gray-900: 16:1 ✅ (WCAG AAA)
  - Links blue: 5:1+ ✅ (WCAG AA)
  - Verificar com WebAIM Contrast
  - Nenhuma cor <4.5:1

- [ ] T041 [P] Semântica HTML
  - Usar <header> (não div)
  - Usar <nav> para menus
  - Links com <a> (não buttons como links)
  - Lista com <ul> + <li>

- [ ] T042 [P] Screen Reader Testing
  - Testar com NVDA (Windows) ou VoiceOver (Mac)
  - Anúncio: "Header, navigation"
  - Categorias anunciadas corretamente
  - Data anunciada

- [ ] T043 Focus Indicators
  - Focus outline visible (ring-2 ring-blue-400)
  - Mínimo 3px espessura
  - Contraste 3:1 contra background

- [ ] T044 Mobile Accessibility
  - Touch targets no mínimo 44x44px
  - Hambúrguer: 48x48px mínimo
  - Espaço entre links
  - Sem hover-only content

- [ ] T045 Lighthouse Audit
  - Accessibility score > 95
  - No errors ou warnings
  - Screenshot dos resultados

**Checkpoint**: WCAG AA Compliant

---

## Phase 7: Integração com Dados (T046-T050)

Conectar header com notícias, categorias reais.

- [ ] T046 Criar `CategoryPage.jsx`
  - Recebe `:slug` via params
  - Filtra notícias por categoria
  - Renderiza NewsGrid com filtradas

- [ ] T047 [P] Filtrar notícias por categoria
  - useNews retorna array
  - Filter por categoria_id
  - Se vazio: "Sem notícias nesta categoria"

- [ ] T048 [P] Exibir categoria ativa no header
  - Detecta current location
  - Compara com categories array
  - Mostra border-bottom na categoria ativa

- [ ] T049 Performance otimização
  - Lazy load dados de categorias
  - Memoize components (useMemo)
  - Evitar re-renders desnecessários

- [ ] T050 [P] Testar fluxo completo
  - Home → Clica ECONOMIA → CategoryPage
  - Vê apenas notícias ECONOMIA
  - Header mostra ECONOMIA destacada
  - Volta com voltar: volta pra Home

**Checkpoint**: Header funcional com dados reais

---

## Phase 8: Polish & Deployment (T051-T055)

Refinamentos finais, tests, documentação.

- [ ] T051 Code cleanup
  - Remover console.logs
  - Imports desnecessários
  - Formatação Prettier/ESLint

- [ ] T052 [P] Build e minificação
  - npm run build
  - Verificar tamanho bundle
  - Header é < 50KB gzipped

- [ ] T053 Cross-browser testing
  - Chrome ✅
  - Firefox ✅
  - Safari ✅
  - Mobile browsers ✅

- [ ] T054 Documentação
  - Comentários em código (onde complexo)
  - README: como extend header
  - Guia: adicionar nova categoria

- [ ] T055 [P] Deploy
  - Commit e push em GitHub
  - Deploy em Vercel
  - Teste em produção

**Checkpoint**: Pronto para produção

---

## 📊 Summary

```
Total Tasks: 55
MVP Scope: T001-T015 (15 tasks, 2-3 dias)
Full Scope: T001-T055 (1-2 semanas)

Parallelizáveis [P]: ~25 tasks (podem rodar simultâneo)
Sequenciais: ~30 tasks (dependem de anteriores)
```

## 🎯 Próximos Passos

1. **Validar com /speckit.analyze** (conferir consistência)
2. **Implementar Phase 1-2** (estrutura + componentes)
3. **Testar no navigador**
4. **Seguir phases 3+**
5. **Deploy quando pronto**
