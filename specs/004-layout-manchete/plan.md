# Plano de Implementação: Layout da Manchete Principal (Feature 004)

**Data**: 2 de abril de 2026  
**Arquiteto**: GitHub Copilot  
**Status**: 🔄 Em planejamento

---

## 🏗️ Arquitetura

### Estrutura de Componentes

```
NewsFeatured (refatorado)
├── FeaturedCarousel (novo)
│   ├── CarouselSlide (novo)
│   ├── CarouselControls (novo)
│   └── CarouselDots (opcional)
└── FeaturedSidebar (novo)
    ├── SidebarItem (novo)
    ├── SidebarItem
    └── SidebarItem
```

### Fluxo de Dados

```
Home.jsx
  ↓
useNews() hook
  ↓
[notícias array]
  ↓
NewsFeatured.jsx (refatorado)
  ├── FeaturedCarousel
  │   ├── news[0] - slide inicial
  │   ├── news[1] - próximo slide
  │   └── news[2] - próximo slide
  └── FeaturedSidebar
      ├── news[3] - item 1
      └── news[4] - item 2
```

---

## 📁 Arquivos a Criar/Modificar

### Novos Arquivos

```
src/components/
├── FeaturedCarousel.jsx (150 linhas)
│   - Gerencia estado do carrossel
│   - Implementa navegação com setas
│   - Efeitos de transição suave
│
├── FeaturedSidebar.jsx (120 linhas)
│   - Renderiza 2 notícias estáticas
│   - Layout em flex vertical
│
└── FeaturedCarouselControls.jsx (80 linhas)
    - Botões anterior/próxima
    - Indicadores (dots) opcionais
```

### Arquivos a Modificar

```
src/components/
└── NewsFeatured.jsx
    - Remover layout grid 2 colunas
    - Usar FeaturedCarousel + FeaturedSidebar
    - Passar dados via props

src/pages/
└── Home.jsx
    - Sem mudanças (NewsFeatured mantém interface)
```

### Arquivos de Estilo

```
src/styles/ (novo ou tailwind)
└── featured.css (opcional, será Tailwind)
    - Classes reutilizáveis
    - Gradiente reutilizável
```

---

## 🎨 Design Decisions

### Altura do Carrossel
- **Desktop**: `h-[500px]` (500px)
- **Tablet**: `h-[350px]` (350px)
- **Mobile**: `h-auto` (120vw)

### Setas de Navegação
- Framework: React Icons (FaChevronLeft, FaChevronRight)
- Posição: Centro lateral (esquerda 16px, direita 16px)
- Hover: `hover:scale-110 transition-transform`
- Tamanho: `text-4xl` (32px)

### Gradiente
```css
background: linear-gradient(
  to top,
  rgba(0, 0, 0, 0.9) 0%,
  rgba(0, 0, 0, 0.5) 50%,
  rgba(0, 0, 0, 0) 100%
);
height: 40%;
```

### Transições
- Fade entre slides: `opacity: 0 → 1` (300ms)
- Sem translateX (performance)
- Usar `requestAnimationFrame` para smoothness

### Auto-play
- **Intervalo**: 5 segundos (configurável)
- **Pausar ao hover**: Sim
- **Pausar ao click**: Não

---

## 🔧 Stack Técnico

### Frontend
- React 18.2.0 (Hooks: useState, useEffect, useRef)
- Tailwind CSS 3.4.0 (Classes CSS)
- React Icons (Ícones das setas)

### Estado
```javascript
const [currentSlide, setCurrentSlide] = useState(0)
const [isAutoPlay, setIsAutoPlay] = useState(true)
const [isPaused, setIsPaused] = useState(false)
const autoPlayRef = useRef(null)
```

### Performance
- Lazy loading de imagens (loading="lazy")
- Memoização com useMemo (CarouselSlide)
- Refs para DOM queries

---

## 📊 Estrutura de Dados

### Notícias Esperadas
```javascript
const news = [
  {
    id: "1",
    titulo: "Título da manchete",
    resumo: "Resumo opcional",
    imagem: "https://...",
    imagemAlt: "Descrição",
    autor: "Autor",
    data_publicacao: "2026-04-02",
    fonte: "https://...",
    slug: "titulo-da-manchete"
  },
  // ... até notícia 5
]

// Distribuição:
// news[0] - Carrossel slide 1
// news[1] - Carrossel slide 2 (pode haver mais)
// news[3] - Sidebar item 1
// news[4] - Sidebar item 2
```

---

## 🎯 Implementação por Fase

### Fase 1: Setup Base
- [ ] Criar `FeaturedCarousel.jsx` com slide estático
- [ ] Criar `FeaturedSidebar.jsx` com 2 items
- [ ] Refatorar `NewsFeatured.jsx`
- [ ] Estilos Tailwind inicial

### Fase 2: Lógica do Carrossel
- [ ] Estado `currentSlide`
- [ ] Funções `nextSlide()` e `prevSlide()`
- [ ] Navegação com setas
- [ ] Transições suave

### Fase 3: Refinamento
- [ ] Auto-play com pause on hover
- [ ] Indicadores (dots)
- [ ] Responsividade
- [ ] Acessibilidade (aria-labels)

### Fase 4: QA & Polish
- [ ] Testes visuais (desktop, tablet, mobile)
- [ ] Performance (build size)
- [ ] Bug fixes
- [ ] Documentação

---

## 📐 Dimensões

### Container Principal
```css
max-width: 1280px;
margin: 0 auto;
padding: 0 1rem;
```

### Grid
```css
display: grid;
grid-template-columns: 2fr 1fr;
gap: 1rem;
```

### Alturas
- **Carrossel**: 500px (desktop), 350px (tablet), auto (mobile)
- **Sidebar**: igual a carrossel
- **Cada item sidebar**: `100% / 2 = 50%`

### Spacing
- Gap entre componentes: `1rem` (16px)
- Padding interno: `1.5rem` (24px)
- Gradiente height: `40%`

---

## 🚀 Métricas de Sucesso

| Métrica | Target | Status |
|---------|--------|--------|
| Build size | < 195 KB | 🟡 TBD |
| Gzip | < 62 KB | 🟡 TBD |
| Lighthouse Performance | > 80 | 🟡 TBD |
| FCP (First Contentful Paint) | < 1.5s | 🟡 TBD |
| Responsivo (3 breakpoints) | ✅ | 🟡 TBD |
| Accessibility (a11y) | WCAG AA | 🟡 TBD |
| Carrossel fluidez | 60 FPS | 🟡 TBD |

---

## 🔄 Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 2026-04-02 | 1.0 | Plano inicial |
