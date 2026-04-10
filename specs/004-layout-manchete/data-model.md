# Data Model: Layout da Manchete Principal (Feature 004)

**Data**: 2 de abril de 2026

---

## 📋 Estrutura de Dados

### News Item (Notícia)

```typescript
interface NewsItem {
  id: string;                    // ID único
  titulo: string;                // Título da notícia
  resumo?: string;               // Resumo/descrição curta
  imagem: string;                // URL da imagem (Cloudinary)
  imagemAlt: string;             // Texto alt para acessibilidade
  autor: string;                 // Nome do autor
  data_publicacao: string;       // ISO 8601 (2026-04-02T10:30:00Z)
  fonte?: string;                // URL da fonte externa
  slug: string;                  // URL slug (sem espaços/especiais)
  categoria?: string;            // Categoria da notícia
  views?: number;                // Contagem de visualizações
}
```

### Exemplo JSON

```json
{
  "id": "1",
  "titulo": "Clécio assegura compromisso com a saúde ao entregar novo hospital",
  "resumo": "Governador inaugura novo equipamento de saúde no estado",
  "imagem": "https://res.cloudinary.com/dgacxy9ga/image/upload/q_auto/news_1.jpg",
  "imagemAlt": "Governador ao lado de equipe médica",
  "autor": "Miguel Silva",
  "data_publicacao": "2026-04-02T10:30:00Z",
  "fonte": "https://www.governo.ap.gov.br",
  "slug": "clecio-saude-hospital",
  "categoria": "política",
  "views": 1240
}
```

---

## 🎯 Uso em Feature 004

### FeaturedCarousel

**Props:**
```typescript
interface FeaturedCarouselProps {
  news: NewsItem[]; // Array de 3+ notícias para carrossel
}
```

**Dados Usados:**
- `imagem` - Background image
- `titulo` - Exibir em overlay
- `resumo` - Exibir em overlay (opcional)
- `autor` - Byline
- `data_publicacao` - Data no byline

### FeaturedSidebar

**Props:**
```typescript
interface FeaturedSidebarProps {
  news: NewsItem[]; // Array de 2 notícias para sidebar
}
```

**Dados Usados:**
- `imagem` - Background image
- `titulo` - Exibir no overlay

### NewsFeatured (Parent)

**Props:**
```typescript
interface NewsFeaturedProps {
  news: NewsItem[]; // Array completo de notícias
}
```

**Lógica:**
```javascript
const carouselNews = news.slice(0, 3); // news[0], news[1], news[2]
const sidebarNews = news.slice(3, 5);  // news[3], news[4]
```

---

## 📊 Fonte de Dados

### Origem: `useNews()` Hook

**Arquivo**: `src/hooks/useNews.js`

```javascript
export function useNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { news, loading, error }
}
```

### Arquivo JSON: `public/data/news.json`

Estrutura:
```json
[
  { id: "1", titulo: "...", ... },
  { id: "2", titulo: "...", ... },
  { id: "3", titulo: "...", ... },
  { id: "4", titulo: "...", ... },
  { id: "5", titulo: "...", ... }
  // ... mais items
]
```

---

## 🔄 Fluxo de Dados

```
Home.jsx
  ↓ useNews()
[NewsItem[], loading, error]
  ↓ pass {news}
NewsFeatured.jsx
  ↓ slice(0,3) e slice(3,5)
├─ carouselNews = [news[0], news[1], news[2]]
│   ↓ pass {news: carouselNews}
│   FeaturedCarousel.jsx
│   ├─ news[0] → slide 1
│   ├─ news[1] → slide 2
│   └─ news[2] → slide 3
│
└─ sidebarNews = [news[3], news[4]]
    ↓ pass {news: sidebarNews}
    FeaturedSidebar.jsx
    ├─ news[0] → item 1
    └─ news[1] → item 2
```

---

## 🛡️ Validação de Dados

### PropTypes

```javascript
import PropTypes from 'prop-types'

FeaturedCarousel.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      resumo: PropTypes.string,
      imagem: PropTypes.string.isRequired,
      imagemAlt: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
      data_publicacao: PropTypes.string.isRequired,
      fonte: PropTypes.string,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
}
```

### Default Values

```javascript
const defaults = {
  news: [],
  titulo: 'Sem título',
  resumo: '',
  imagem: '/images/placeholder.jpg',
  autor: 'Redação',
  data_publicacao: new Date().toISOString(),
}
```

---

## 📈 Estado do Carrossel

### useState

```javascript
// Índice do slide atual
const [currentSlide, setCurrentSlide] = useState(0)

// Pause state para auto-play
const [isPaused, setIsPaused] = useState(false)

// Exemplo de uso:
currentSlide = 0 // Exibe news[0]
currentSlide = 1 // Exibe news[1]
currentSlide = 2 // Exibe news[2]
currentSlide = 0 // Loop de volta (currentSlide % news.length)
```

---

## 🔄 Transformações de Dados

### Formatação de Data

```javascript
// Entrada: "2026-04-02T10:30:00Z"
// Saída: "02 de abril de 2026"

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
```

### Truncamento de Título

```javascript
// Entrada: "Clécio assegura compromisso com a saúde..."
// Saída: "Clécio assegura compromisso..." (max 70 chars)

const truncateTitle = (title, maxLength = 70) => {
  return title.length > maxLength 
    ? title.substring(0, maxLength) + '...'
    : title
}
```

---

## 💾 Persistência

### Session Storage (Auto-play)

```javascript
// Salvar preferência de auto-play
sessionStorage.setItem('autoPlayEnabled', 'true')

// Recuperar
const autoPlayEnabled = sessionStorage.getItem('autoPlayEnabled') !== 'false'
```

### LocalStorage (Opcional - Future)

```javascript
// Rastrear últimas notícias vistas
localStorage.setItem('lastViewed', JSON.stringify(news[currentSlide]))
```

---

## 🔐 Segurança de Dados

### XSS Prevention
- React escapa automaticamente texto em JSX
- URLs de imagem validadas (Cloudinary)
- Sem `dangerouslySetInnerHTML`

### CORS
- Imagens de Cloudinary (cross-origin)
- Verificar headers CORS na resposta

### Data Masking (Opcional)
```javascript
// Não expor IDs internos
const safeNews = news.map(item => ({
  ...item,
  internalId: undefined // Remove ID interno se necessário
}))
```

---

## 📊 Schema Comparison

### Antes (Current - Feature 003)

```typescript
interface OldNewsFeaturedProps {
  news: NewsItem | null; // Single item
}
```

**Limitação:** Só exibia 1 notícia

### Depois (Feature 004)

```typescript
interface NewNewsFeaturedProps {
  news: NewsItem[]; // Array
}
```

**Benefício:** Exibe múltiplas notícias em carrossel

---

## 🧪 Dados de Teste

### Mock Data para Storybook (Futuro)

```javascript
const mockNews = [
  {
    id: '1',
    titulo: 'Notícia 1',
    resumo: 'Resumo 1',
    imagem: 'https://via.placeholder.com/800x450',
    imagemAlt: 'Imagem 1',
    autor: 'Autor 1',
    data_publicacao: '2026-04-02T10:00:00Z',
    slug: 'noticia-1',
  },
  // ... mais items
]
```

---

## 📝 Histórico

| Data | Mudança |
|------|---------|
| 2026-04-02 | Data model criado |

