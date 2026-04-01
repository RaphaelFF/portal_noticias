# Quickstart Guide

**Date**: 2026-04-01  
**Feature**: Exibição da Home  
**Purpose**: Setup local, estrutura de dados, e verificação de funcionamento

---

## 1. Setup do Ambiente

### Pré-requisitos
- Node.js 18+ ([download](https://nodejs.org))
- npm ou yarn
- Git

### Instalação

```bash
# Clonar repositório (se ainda não fez)
git clone <repo-url>
cd portal_noticias

# Trocar para branch da feature
git checkout 001-exibicao-home

# Instalar dependências
npm install

# (O Vite e React Router já devem estar em package.json)
```

### Verificar instalação

```bash
npm list vite react react-router-dom tailwindcss
# Deve exibir:
# vite@^4.x.x ou ^5.x.x
# react@^18.x.x
# react-router-dom@^6.x.x
# tailwindcss@^3.x.x
```

---

## 2. Estrutura de Dados (JSON)

### Criar arquivo de dados

```bash
mkdir -p public/data
touch public/data/news.json
```

### Preencher `public/data/news.json`

Use o template abaixo (ajuste URLs e autores conforme necessário):

```json
{
  "titulo": "PortalNoticias - Últimas Notícias",
  "descricao": "As melhores notícias do dia em um só lugar",
  "manchetaPrincipal": {
    "id": "001",
    "slug": "eleicoes-2026-resultado",
    "titulo": "Resultado das eleições 2026: vencedor eleito com 52% dos votos",
    "resumo": "Candidato vence em votação acirrada. Resultado divulgado após apuração de 95% das urnas.",
    "imagem": "https://via.placeholder.com/1200x600?text=Eleicoes+2026",
    "imagemAlt": "Candidato vencedor fazendo discurso de vitória",
    "data_publicacao": "2026-04-01T09:15:00Z",
    "ultima_atualizacao": "2026-04-01T10:30:00Z",
    "autor": "Maria Silva",
    "fonte": "https://example.com/agencia"
  },
  "noticiasSecundarias": [
    {
      "id": "002",
      "slug": "inflacao-cai-03-percentuais",
      "titulo": "Inflação cai 0,3 pontos percentuais em março",
      "resumo": "Índice de preços registra queda em comparação com mês anterior.",
      "imagem": "https://via.placeholder.com/400x300?text=Inflacao",
      "imagemAlt": "Gráfico de deflação",
      "data_publicacao": "2026-03-31T14:00:00Z",
      "autor": "João Santos",
      "fonte": "https://example.com/economia"
    },
    {
      "id": "003",
      "slug": "ia-nova-regulacao",
      "titulo": "Nova regulação para IA entra em vigor",
      "resumo": "Legislação estabelece padrões de segurança e transparência.",
      "imagem": "https://via.placeholder.com/400x300?text=Inteligencia+Artificial",
      "imagemAlt": "Símbolo de inteligência artificial",
      "data_publicacao": "2026-03-30T10:45:00Z",
      "autor": "Laura Mendes",
      "fonte": "https://example.com/tecnologia"
    },
    {
      "id": "004",
      "slug": "clima-projecoes-2026",
      "titulo": "Previsões climáticas apontam verão 8% mais quente",
      "resumo": "Meteorologistas indicam fenômeno El Niño influenciará condições.",
      "imagem": "https://via.placeholder.com/400x300?text=Clima",
      "imagemAlt": "Mapa de previsão meteorológica",
      "data_publicacao": "2026-03-29T16:20:00Z",
      "autor": "Carlos Oliveira",
      "fonte": "https://example.com/ciencia"
    },
    {
      "id": "005",
      "slug": "esporte-copa-mundial",
      "titulo": "Seleção avança para semi-final da Copa",
      "resumo": "Vitória emocionante nos pênaltis garante próxima fase.",
      "imagem": "https://via.placeholder.com/400x300?text=Futebol",
      "imagemAlt": "Jogador comemorando gol",
      "data_publicacao": "2026-03-28T20:30:00Z",
      "autor": "Pedro Costa",
      "fonte": "https://example.com/esportes"
    }
  ],
  "ultimaAtualizacao": "2026-04-01T15:00:00Z",
  "versao": "1.0.0"
}
```

### Validação de dados

```bash
# Validar JSON syntax
npx json-lint public/data/news.json
# Deve exibir: "✓ Valid JSON"
```

---

## 3. Rodar servidor de desenvolvimento

```bash
npm run dev
```

**Output esperado:**

```
  VITE v4.x.x

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## 4. Estrutura de Componentes (O que implementar)

### Arquivo: `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:slug" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Arquivo: `src/pages/Home.jsx`

Carrega dados de `public/data/news.json` e assembla componentes.

```jsx
import { useEffect, useState } from 'react'
import NewsFeatured from '../components/NewsFeatured'
import NewsGrid from '../components/NewsGrid'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/news.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Carregando...</div>

  return (
    <main className="min-h-screen bg-white">
      <NewsFeatured news={data.manchetaPrincipal} />
      <NewsGrid news={data.noticiasSecundarias} />
    </main>
  )
}
```

### Arquivo: `src/components/NewsFeatured.jsx`

Componente da manchete principal.

```jsx
import { Link } from 'react-router-dom'

export default function NewsFeatured({ news }) {
  return (
    <article className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={news.imagem}
          alt={news.imagemAlt}
          loading="eager"
          className="w-full h-96 object-cover rounded"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{news.titulo}</h1>
          {news.resumo && <p className="text-xl mb-6 text-gray-300">{news.resumo}</p>}
          <div className="text-sm mb-6">
            <p>{news.autor}</p>
            <p>{new Date(news.data_publicacao).toLocaleDateString('pt-BR')}</p>
            {news.fonte && <a href={news.fonte} className="text-blue-300 underline">Fonte original</a>}
          </div>
          <Link
            to={`/noticias/${news.slug}`}
            className="inline-block bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-700"
          >
            Leia a notícia completa
          </Link>
        </div>
      </div>
    </article>
  )
}
```

### Arquivo: `src/components/NewsGrid.jsx`

Grid de notícias secundárias.

```jsx
import NewsCard from './NewsCard'

export default function NewsGrid({ news }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Notícias do dia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map(article => (
          <NewsCard key={article.id} news={article} />
        ))}
      </div>
    </section>
  )
}
```

### Arquivo: `src/components/NewsCard.jsx`

Card reutilizável para notícia.

```jsx
import { Link } from 'react-router-dom'

export default function NewsCard({ news }) {
  return (
    <article className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={news.imagem}
        alt={news.imagemAlt}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{news.titulo}</h3>
        <p className="text-sm text-gray-600 mb-4">{news.autor}</p>
        <Link
          to={`/noticias/${news.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  )
}
```

---

## 5. Verificação de Requisitos

### Checklist de implementação

- [ ] **Home carrega e exibe manchete principal** (NewsFeatured)
- [ ] **Grid de notícias exibe 4+ notícias** em desktop, 1-2 colunas em mobile
- [ ] **Cliques em notícias levam para `/noticias/[slug]`** (usa React Router)
- [ ] **Imagens exibem ou mostram fallback** se falharem
- [ ] **Acessibilidade**: Alt text em todas imagens; navegação por teclado funciona
- [ ] **Performance**: FCP < 1.5s (medir em Network tab, 3G throttle)
- [ ] **Responsividade**: Layout adapta em desktop, tablet, mobile

### Performance testing

```bash
# Abra DevTools (F12) → Network
# Throttle para "Slow 3G"
# Recarregue (Ctrl+R)
# Verifique que FCP acontece < 1.5s
```

### Acessibilidade testing

```bash
# Abra DevTools → Lighthouse
# Rode auditoria
# Verifique Accessibility score > 90
```

---

## 6. Estrutura git

```bash
# Você está no branch
git branch
# 001-exibicao-home

# Commitar progresso
git add src/ public/data/news.json
git commit -m "feat: implementar home com manchete e grid de notícias"

# Push (ao terminar)
git push origin 001-exibicao-home
```

---

## 7. Troubleshooting

**Problema**: `404 Not Found` ao carregar news.json

**Solução**: Verificar que arquivo existe em `public/data/news.json` (não em `src/data/`)

---

**Problema**: Imagens não carregam

**Solução**: Se usar URLs locais, copiar imagens para `public/images/` e referenciar como `/images/nome.jpg`

---

**Problema**: React Router não funciona (URLs retornam 404)

**Solução**: Vite precisa de `HistoryApiPlugin`. Use `npm run build` e rode com `npm run preview` para testar build production.

---

## 8. Próximos passos

1. ✅ **Setup base**: Este quickstart
2. ⏳ **Implementar componentes**: Seguir estrutura acima
3. ⏳ **Testar responsividade**: Desktop, tablet, mobile
4. ⏳ **Validar acessibilidade**: WCAG AA (Lighthouse)
5. ⏳ **Medir performance**: FCP e CLS targets
6. ⏳ **Deploy**: (será documentado após implementação)

---

**Version**: 1.0 | **Date**: 2026-04-01