# Quickstart: Implementar Header/Navbar

Guia rápido para setup e desenvolvimento do header.

---

## ⚡ 5 Minutos de Setup

### 1. Preparar Pasta

```bash
cd specs/002-header-navbar
```

### 2. Criar Estrutura Pastas no Projeto

```bash
# No seu projeto portal_noticias
mkdir -p src/components/Header
mkdir -p src/hooks
touch src/utils/categories.js
```

### 3. Criar Constants

**src/utils/categories.js:**

```javascript
export const CATEGORIES = [
  { id: 'ultimas', name: 'ÚLTIMAS NOTÍCIAS', slug: 'ultimas' },
  { id: 'cultura', name: 'CULTURA', slug: 'cultura' },
  { id: 'economia', name: 'ECONOMIA', slug: 'economia' },
  { id: 'educacao', name: 'EDUCAÇÃO', slug: 'educacao' },
  { id: 'esportes', name: 'ESPORTES', slug: 'esportes' },
  { id: 'ambiente', name: 'MEIO AMBIENTE', slug: 'meio-ambiente' },
  { id: 'politica', name: 'POLÍTICA', slug: 'politica' },
  { id: 'saude', name: 'SAÚDE', slug: 'saude' },
];

export const SITE_NAME = 'SuaLogo'; // Mude para nome da sua rádio
```

---

## 🏗️ Estrutura Componentes (Boilerplate)

### **src/hooks/useMediaQuery.js**

```javascript
import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}
```

### **src/hooks/useDate.js**

```javascript
import { useState, useEffect } from 'react'

export function useDate() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000) // Update a cada minuto
    return () => clearInterval(timer)
  }, [])

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
```

### **src/components/Header/DateDisplay.jsx**

```javascript
import { useDate } from '../../hooks/useDate'

export function DateDisplay() {
  const date = useDate()
  return <div className="text-xs md:text-sm text-gray-400">{date}</div>
}
```

### **src/components/Header/CategoryMenu.jsx**

```javascript
import { Link, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../../utils/categories'

export function CategoryMenu() {
  const location = useLocation()
  const slug = location.pathname.split('/')[2]

  return (
    <nav className="flex flex-wrap gap-4 md:gap-6">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/categorias/${cat.slug}`}
          className={`text-sm md:text-base hover:text-blue-400 transition ${
            slug === cat.slug ? 'border-b-2 border-blue-600' : ''
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  )
}
```

### **src/components/Header/MobileMenu.jsx**

```javascript
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../utils/categories'

export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <nav className="fixed left-0 top-20 w-64 bg-gray-900 h-screen z-50 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/categorias/${cat.slug}`}
                onClick={onClose}
                className="block px-4 py-2 hover:bg-gray-800 rounded"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
```

### **src/components/Header/Header.jsx**

```javascript
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { DateDisplay } from './DateDisplay'
import { CategoryMenu } from './CategoryMenu'
import { MobileMenu } from './MobileMenu'
import { SITE_NAME } from '../../utils/categories'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const menuRef = useRef(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Fechar menu ao redimensionar
  useEffect(() => {
    function handleResize() {
      if (!isMobile) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Mobile Layout */}
      {isMobile && (
        <div className="h-20 flex justify-between items-center px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl hover:text-blue-400 transition"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>

          <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">
            {SITE_NAME}
          </Link>

          <DateDisplay />
        </div>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-3xl font-bold hover:text-blue-400 transition">
              {SITE_NAME}
            </Link>
            <DateDisplay />
          </div>
          <CategoryMenu />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div ref={menuRef}>
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  )
}
```

---

## 🔌 Integração em App.jsx

```javascript
import Header from './components/Header/Header'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias/:slug" element={<Article />} />
          {/* Adicionar depois: */}
          {/* <Route path="/categorias/:slug" element={<CategoryPage />} /> */}
        </Routes>
      </main>
    </>
  )
}
```

---

## 🧪 Teste Rápido

```bash
# 1. Terminal
npm run dev

# 2. Browser
# Abrir http://localhost:5174/

# 3. DevTools
# F12 → Responsive Design (teste mobile/desktop)

# 4. Verificar:
# ✅ Logo centralizado (mobile) ou left (desktop)
# ✅ Data à direita
# ✅ Hambúrguer aparece em mobile
# ✅ Categorias aparecem em desktop
# ✅ Clique em categoria navega (error é ok por enquanto)
```

---

## 📝 Próximos Passos (Ordenado)

### Mínimo (MVP - 3 horas)
```
✅ T001-T007: Setup + pastas
✅ T008-T012: Componentes básicos
✅ T016-T019: Interatividade mobile
✅ T023-T027: Styling
```

### Recomendado (1 dia)
```
+ T020-T022: Validar responsividade
+ T031-T034: Animações
+ T038-T045: Acessibilidade
```

### Completo (2-3 dias)
```
+ T046-T050: Integração dados
+ T051-T055: Polish + deploy
```

---

## ⚡ Comandos Rápidos

```bash
# Validar arquivo
npm run lint src/components/Header/

# Build
npm run build

# Deploy
git add .
git commit -m "feat: adicionar header/navbar"
git push
# Vercel auto-deploy

# Ver tamanho
du -sh src/components/Header/
```

---

## 🎯 Debugging

Se algo der errado:

```javascript
// Em Header.jsx, adicione logs temporários:
console.log('isMobile:', isMobile)
console.log('isMenuOpen:', isMenuOpen)

// DevTools
// F12 → Console → procure por erros
// F12 → Elements → inspect header
```

---

## 📚 Referências

- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility](https://www.w3.org/WAI/)

---

## ✅ Checklist Rápido

Antes de considerar "pronto":

```
□ Header renderiza sem erros
□ Mobile menu abre/fecha
□ Responsive (375px, 768px, 1024px)
□ Navegação por teclado (Tab)
□ ARIA labels presentes
□ Lighthouse A11y > 95
□ Nenhum console error
□ Commit no GitHub
```

---

**Pronto para começar?** 🚀

Vá pro T001 em tasks.md ou vir chat se tiver dúvida!
