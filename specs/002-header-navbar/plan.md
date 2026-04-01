# Plano de Implementação: Header/Navbar

## ✅ Validação Constituição

| Princípio | Atendimento | Justificativa |
|-----------|------------|---------------|
| 🏛️ **Acessibilidade** | ✅ FULL | ARIA labels, navegação teclado, semantic HTML |
| ⚡ **Performance** | ✅ FULL | Sem libs pesadas, CSS puro, < 100ms load |
| 🔗 **Credibilidade** | ✅ FULL | Logo/nome visível, navegação clara |

**Resultado**: 3/3 princípios atendidos ✅

---

## 🏗️ Tech Stack

### Frontend
```
Componentes React:
├── Header.jsx (componente principal)
├── MobileMenu.jsx (menu hambúrguer)
├── CategoryMenu.jsx (menu categorias)
└── Header.css (estilos Tailwind)

Hooks:
├── useMediaQuery (detectar mobile/desktop)
└── useDate (atualizar data em tempo real)

State Management:
└── useState (menu aberto/fechado)
```

### Linguagens & Libs
```
✅ React 18 (já tem)
✅ Tailwind CSS (já tem)
✅ React Router (já tem)
✅ Vanilla JS (sem libs adicionais!)
```

### Build
```
✅ Vite (já tem)
✅ Minificação automática
✅ CSS puro (sem CSS-in-JS)
```

---

## 📊 Dados Schema

O header **não precisa de banco de dados**. Dados são estáticos:

```javascript
// src/utils/constants.js (adicionar)
export const CATEGORIES = [
  { id: 'ultimas', name: 'ÚLTIMAS NOTÍCIAS', slug: 'ultimas' },
  { id: 'cultura', name: 'CULTURA', slug: 'cultura' },
  { id: 'direitos', name: 'DIREITOS HUMANOS', slug: 'direitos-humanos' },
  { id: 'economia', name: 'ECONOMIA', slug: 'economia' },
  { id: 'educacao', name: 'EDUCAÇÃO', slug: 'educacao' },
  { id: 'esportes', name: 'ESPORTES', slug: 'esportes' },
  { id: 'geral', name: 'GERAL', slug: 'geral' },
  { id: 'internacional', name: 'INTERNACIONAL', slug: 'internacional' },
  { id: 'justica', name: 'JUSTIÇA', slug: 'justica' },
  { id: 'ambiente', name: 'MEIO AMBIENTE', slug: 'meio-ambiente' },
  { id: 'politica', name: 'POLÍTICA', slug: 'politica' },
  { id: 'saude', name: 'SAÚDE', slug: 'saude' },
];

export const SITE_NAME = 'SuaLogo'; // ou 'PortalNoticias'
```

---

## 🏛️ Arquitetura

### Hierarquia de Componentes

```
App.jsx
  ├── Header.jsx (NOVO)
  │   ├── Logo (clicável, leva home)
  │   ├── MobileMenu.jsx (mobile only)
  │   │   └── Hambúrguer ☰ (clicável)
  │   ├── CategoryMenu.jsx (desktop only)
  │   │   ├── ÚLTIMAS NOTÍCIAS
  │   │   ├── CULTURA
  │   │   └── ... (10 mais)
  │   └── DateDisplay (sempre visível)
  │
  ├── Routes
  │   ├── Home.jsx
  │   ├── Article.jsx
  │   ├── CategoryPage.jsx (NOVO - lista notícias por categoria)
  │   └── ...
  │
  └── Footer.jsx (futuro)
```

### State Flow

```
Header.jsx
  ├── useState(isMenuOpen) - controla se menu está aberto
  ├── useMediaQuery(md) - detecta se é mobile ou desktop
  ├── useDate() - atualiza data em tempo real
  │
  ├── onClick hambúrguer
  │   └── setIsMenuOpen(!isMenuOpen)
  │
  ├── onClick categoria
  │   ├── navigate(/categorias/[slug])
  │   └── setIsMenuOpen(false)
  │
  └── onClick fora do menu
      └── setIsMenuOpen(false) [outside click]
```

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── Header.jsx                  (NOVO - main header)
│   │   ├── imports: MobileMenu, CategoryMenu, DateDisplay
│   │   └── exports: <Header />
│   │
│   ├── MobileMenu.jsx             (NOVO - hamburger menu mobile)
│   │   ├── props: isOpen, onClose, categories, onCategoryClick
│   │   └── exports: <MobileMenu />
│   │
│   ├── CategoryMenu.jsx           (NOVO - categories desktop)
│   │   ├── props: categories, activeCategory
│   │   └── exports: <CategoryMenu />
│   │
│   ├── DateDisplay.jsx            (NOVO - current date)
│   │   └── exports: <DateDisplay />
│   │
│   ├── NewsCard.jsx               (existente)
│   ├── NewsFeatured.jsx           (existente)
│   └── NewsGrid.jsx               (existente)
│
├── hooks/
│   ├── useNews.js                 (existente)
│   ├── useMediaQuery.js           (NOVO - detecta breakpoints)
│   └── useDate.js                 (NOVO - data atualizada)
│
├── pages/
│   ├── Home.jsx                   (existente)
│   ├── Article.jsx                (existente)
│   ├── CategoryPage.jsx           (NOVO - lista por categoria)
│   └── ...
│
├── utils/
│   └── constants.js               (atualizar - adicionar CATEGORIES)
│
├── styles/
│   ├── globals.css                (existente)
│   └── header.css                 (NOVO - estilos específicos)
│
└── App.jsx                        (atualizar - adicionar Header, rotas)
```

---

## 🎨 Design Details

### Cores
```
Header background: bg-gray-900 (mesmo dark theme da manchete)
Text: text-white
Links: text-white
Hover: text-blue-400
Active: border-bottom-2 blue-600
```

### Tipografia
```
Logo: text-2xl md:text-3xl font-bold
Categorias: text-sm md:text-base
Data: text-xs md:text-sm text-gray-400
```

### Responsive Breakpoints
```
Mobile (< 768px):
  - Logo centralizado ou left
  - Hambúrguer à esquerda
  - Data à direita
  - Categorias: NÃO visíveis

Tablet (768px - 1024px):
  - Logo left
  - Alguns ícones/abreviaturas
  - Categorias em 2 linhas

Desktop (> 1024px):
  - Logo left
  - Categorias em linha (12 items)
  - Data right
```

### Spacing
```
Header height:
  - Mobile: h-20 (80px)
  - Desktop: h-32 (128px)

Padding:
  - Mobile: px-4 py-3
  - Desktop: px-8 py-4

Gap entre elementos:
  - Categorias: gap-4 md:gap-6
  - Menu: space-y-2
```

---

## 🔄 Fluxo de Usuário

### Desktop (1024px+)

```
1. Usuário vê header:
   [Logo] [CATEGORIA 1] [CATEGORIA 2] ... [Data]

2. Usuário clica em CATEGORIA:
   → Navega para /categorias/economia
   → Home recarrega com notícias filtradas
   → Header mostra ECONOMIA em destaque

3. Usuário scroll for além do header:
   → Header fica sticky (fixo) [optional]
   → Pode clicar em categoria ou logo sem voltar pra top
```

### Mobile (< 768px)

```
1. Usuário vê header:
   [☰] [Logo] [Data]

2. Usuário clica hambúrguer:
   → Menu lateral abre (overlay)
   → Mostra 12 categorias
   → Fundo escurece (backdrop)

3. Usuário clica em categoria:
   → Navega para /categorias/economia
   → Menu fecha automaticamente
   → Header atualiza (se aplicável)

4. Usuário clica fora do menu:
   → Menu fecha
   → Backdrop desaparece

5. Viewport redimensiona (375px → 800px):
   → Menu fecha automaticamente
   → Modo desktop ativa
```

---

## ⚙️ Implementação Details

### Header.jsx Principal

```javascript
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      {/* Mobile: Logo + Hambúrguer + Data */}
      {isMobile && (
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>
          <Link to="/" className="text-2xl font-bold">
            SuaLogo
          </Link>
          <DateDisplay />
        </div>
      )}
      
      {/* Desktop: Logo + Categorias + Data */}
      {!isMobile && (
        <div className="px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-3xl font-bold">
              SuaLogo
            </Link>
            <DateDisplay />
          </div>
          <CategoryMenu />
        </div>
      )}
      
      {/* Menu Mobile (Overlay) */}
      {isMobile && isMenuOpen && (
        <MobileMenu
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}
```

---

## 🔗 Rotas Novas

```
GET /                    → Home (usa Header)
GET /noticias/:slug      → Article detail (usa Header)
GET /categorias/:slug    → Category page (NOVO - lista notícias por cat)
```

### CategoryPage.jsx (Preview)

```javascript
export default function CategoryPage({ category }) {
  return (
    <main>
      <h1>Notícias: {category.name}</h1>
      {/* Renderiza NewsGrid com notícias filtradas */}
    </main>
  )
}
```

---

## 🧪 Testing Strategy

### Manual Tests
```
□ Mobile (375px): menu abre/fecha
□ Tablet (768px): transição para desktop
□ Desktop (1280px): categorias visíveis
□ Hover em categoria: cor muda
□ Click em categoria: navega corretamente
□ Data atualiza à meia-noite
□ Menu fecha com outside click
□ AcessibilidadeKeyboard (Tab funciona)
□ Alt text/ARIA labels presentes
```

### Browser Tests
```
□ Chrome
□ Firefox
□ Safari
□ Mobile browsers (iOS Safari, Chrome Android)
```

---

## 📈 Performance Targets

```
Header Load Time: < 100ms
Menu Open/Close: < 200ms
No CLS (Cumulative Layout Shift)
No layout thrashing
Mobile score > 85
```

---

## 🚀 Ordem de Implementação

```
Phase 1: Basic Header
  → Logo + Date display

Phase 2: Category Menu (Desktop)
  → Render categories

Phase 3: Mobile Menu
  → Hambúrguer + Mobile menu overlay

Phase 4: Hooks & Logic
  → useMediaQuery, useDate

Phase 5: Routing Integration
  → Conectar com React Router

Phase 6: Polish
  → Styles refinados, animations, A11y
```

---

## 🎯 Definition of Done

```
✅ Header renders em todas páginas
✅ Menu mobile funciona (open/close/navigate)
✅ Menu desktop funciona (hover/click)
✅ Data atualiza automaticamente
✅ Responsivo (mobile/tablet/desktop)
✅ Acessível (keyboard nav, ARIA)
✅ Lighthouse A11y > 90
✅ Sem console errors
✅ Testes manuais passados
✅ Code review aprovado
```
