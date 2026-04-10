# Quickstart: Layout da Manchete Principal (Feature 004)

**Objetivo**: Guia rápido para implementar e testar a Feature 004

---

## 🚀 Início Rápido

### 1. Criar Branch
```bash
git checkout -b 004-layout-manchete
```

### 2. Criar Estrutura de Componentes
```bash
# Novos arquivos
touch src/components/FeaturedCarousel.jsx
touch src/components/FeaturedSidebar.jsx
touch src/components/FeaturedCarouselControls.jsx
```

### 3. Estrutura de Stubs

**src/components/FeaturedCarousel.jsx**
```jsx
import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import FeaturedCarouselControls from './FeaturedCarouselControls'

export default function FeaturedCarousel({ news = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  const slide = news[currentSlide] || null
  
  if (!slide) return null

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  return (
    <div
      className="relative h-[500px] md:h-[500px] sm:h-[350px] rounded-xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ backgroundImage: `url(${slide.imagem})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Controls */}
      <FeaturedCarouselControls
        onNext={nextSlide}
        onPrev={prevSlide}
        currentSlide={currentSlide}
        totalSlides={news.length}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Spacer para empurrar para baixo */}
        <div />

        {/* Text at bottom-left */}
        <div className="p-6 text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            {slide.titulo}
          </h1>
          {slide.resumo && (
            <p className="text-sm md:text-base text-white/90 mb-3 line-clamp-2">
              {slide.resumo}
            </p>
          )}
          <div className="flex flex-wrap gap-2 text-xs md:text-sm text-white/70">
            {slide.autor && <span>{slide.autor}</span>}
            {slide.data_publicacao && <span>•</span>}
            {slide.data_publicacao && <span>{new Date(slide.data_publicacao).toLocaleDateString('pt-BR')}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**src/components/FeaturedSidebar.jsx**
```jsx
export default function FeaturedSidebar({ news = [] }) {
  if (news.length < 2) return null

  const [item1, item2] = news.slice(0, 2)

  return (
    <div className="flex flex-col gap-0 h-[500px]">
      {[item1, item2].map((item, idx) => (
        <div
          key={idx}
          className="flex-1 relative rounded-xl overflow-hidden mb-2"
          style={{ backgroundImage: `url(${item.imagem})`, backgroundSize: 'cover' }}
        >
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
            <h3 className="text-lg font-bold text-white line-clamp-2">
              {item.titulo}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
```

**src/components/FeaturedCarouselControls.jsx**
```jsx
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function FeaturedCarouselControls({ onNext, onPrev }) {
  return (
    <>
      {/* Prev Button */}
      <button
        onClick={onPrev}
        aria-label="Notícia anterior"
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 text-white text-3xl hover:scale-110 transition-transform"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        aria-label="Próxima notícia"
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 text-white text-3xl hover:scale-110 transition-transform"
      >
        <FaChevronRight />
      </button>
    </>
  )
}
```

### 4. Refatorar NewsFeatured.jsx

```jsx
import FeaturedCarousel from './FeaturedCarousel'
import FeaturedSidebar from './FeaturedSidebar'

export default function NewsFeatured({ news = [] }) {
  if (news.length === 0) return null

  const carouselNews = news.slice(0, 3) // 3 slides para carrossel
  const sidebarNews = news.slice(3, 5) // 2 items para sidebar

  return (
    <article className="max-w-7xl mx-auto px-4 py-8" aria-label="Manchete principal">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carrossel - 2/3 */}
        <div className="md:col-span-2">
          <FeaturedCarousel news={carouselNews} />
        </div>

        {/* Sidebar - 1/3 */}
        <div className="md:col-span-1">
          <FeaturedSidebar news={sidebarNews} />
        </div>
      </div>
    </article>
  )
}
```

---

## 🧪 Teste Local

### 1. Iniciar Dev Server
```bash
npm run dev
```

### 2. Navegar para Home
- Url: http://localhost:5173/
- Visualizar manchete nova

### 3. Testar Interações
- [ ] Clique nas setas (anterior/próxima)
- [ ] Hover no carrossel (deve pausar auto-play)
- [ ] Redimensionar janela (testar responsividade)
- [ ] Console: sem erros/warnings

### 4. Testar Responsividade
```bash
# Chrome DevTools
F12 → Toggle device toolbar (Ctrl+Shift+M)

# Devices
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 375x667
```

---

## 🔍 Debugging

### Issue: Carrossel não muda de slide
```javascript
// Verificar currentSlide state
console.log('currentSlide:', currentSlide)
console.log('news.length:', news.length)
```

### Issue: Imagem não aparece
```javascript
// Verificar URL da imagem
console.log('Background image:', `url(${slide.imagem})`)

// Verificar no DevTools
// Elements → Inspect → Styles → background-image
```

### Issue: Altura diferente entre carrossel e sidebar
```css
/* Verificar height das divs */
.carousel { height: 500px; } /* deve ser igual */
.sidebar { height: 500px; } /* deve ser igual */
```

---

## 📦 Build & Deploy

### 1. Build Local
```bash
npm run build
```

### 2. Verificar Tamanho
```bash
# Comparar com baseline anterior
# Deve estar < 195 KB JS
```

### 3. Preview
```bash
npm run preview
# http://localhost:4173/
```

### 4. Commit
```bash
git add -A
git commit -m "feat(004-layout-manchete): implementar layout de carrossel + sidebar"
```

---

## 📋 Checklist de Implementação

- [ ] Componentes criados (FeaturedCarousel, FeaturedSidebar, Controls)
- [ ] NewsFeatured.jsx refatorado
- [ ] Estilos aplicados (Tailwind)
- [ ] Carrossel funciona (setas)
- [ ] Auto-play funciona (5s interval)
- [ ] Responsividade testada (3 breakpoints)
- [ ] Sem console errors/warnings
- [ ] Build < 195 KB
- [ ] Commit criado
- [ ] Branch mergeable

---

## 🎯 Próximos Passos Após Implementação

1. Fazer commit
2. Abrir PR para `001-exibicao-home`
3. Code review
4. Merge em `001-exibicao-home`
5. Merge em `master`

---

## 📞 Suporte

Para dúvidas durante a implementação:
1. Verificar `spec.md` para requisitos
2. Verificar `plan.md` para arquitetura
3. Verificar `tasks.md` para ordem de implementação
4. Executar `npm run dev` e inspecionar console

