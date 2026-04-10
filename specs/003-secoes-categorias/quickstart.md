# Feature 003 - Seções de Categorias: Quickstart

**Last Updated**: 2026-04-02  
**Status**: Ready for Development

---

## 🚀 Quick Start Guide

Este é um guia rápido para começar o desenvolvimento da Feature 003. Para detalhes completos, consulte [spec.md](./spec.md) ou [plan.md](./plan.md).

---

## 📌 Feature em Uma Linha

Adicionar 8 seções dinâmicas na Home mostrando notícias recentes de cada categoria, com layout responsivo e design system aplicado.

---

## ✅ Pré-requisitos

- ✅ Projeto React + Vite + Tailwind configurado
- ✅ Feature 001 (Manchete + Grid secundário) finalizada
- ✅ Feature 002 (Header) finalizada
- ✅ `public/data/news.json` com campo `categoria` em cada notícia
- ✅ `src/utils/constants.js` com array `CATEGORIES`
- ✅ `src/hooks/useNewsByCategory.js` funcionando
- ✅ `src/components/NewsCard.jsx` existente
- ✅ Design System (`DESIGN_SYSTEM.md`) definido

---

## 🎯 Escopo (O Que Fazer)

### Criar

1. **`src/components/CategorySection.jsx`** - Componente principal
   - Renderiza seção de categoria com título, grid, link "ver todas"
   - Props: `category`, `featuredNewsId`
   - Estados: loading, error, items

2. **(Opcional) `src/components/CategorySkeleton.jsx`** - Placeholder loading
   - 4 cards skeleton durante carregamento

### Modificar

3. **`src/pages/Home.jsx`**
   - Adicionar loop sobre `CATEGORIES`
   - Renderizar `<CategorySection>` para cada
   - Passar `News.featuredNews.id` para excluir duplicação

4. **`src/hooks/useNewsByCategory.js`** (se necessário)
   - Adicionar parâmetro `exclude_ids` (array ou ID)
   - Retornar notícias filtradas + top 4 + sem IDs excluídos
   - Wrappear resultado em `useMemo`

### Arquivo de Teste

5. **`src/components/__tests__/CategorySection.test.jsx`** - Unit tests
   - Renderização básica
   - Estados (loading, error, empty)
   - Links funcionam

6. **`src/pages/__tests__/Home.test.jsx`** - Integration tests (upgrade)
   - 8 seções renderizam
   - Manchete não aparece em nenhuma
   - Sem duplicações

---

## 🚫 Escopo (O Que NÃO Fazer)

- ❌ Não criar componentes novos além de CategorySection (reutilizar NewsCard)
- ❌ Não adicionar dependências externas (sem carrossel lib, sem nova UI lib)
- ❌ Não modificar NewsCard componente (já funciona)
- ❌ Não mudar estrutura de dados JSON
- ❌ Não quebrar compatibilidade com outras pages (Home, Category, Article)

---

## 🛠️ Passo a Passo de Desenvolvimento

### Passo 1: Setup Branch
```bash
git checkout main
git pull origin main
git checkout -b 003-secoes-categorias
```

### Passo 2: Entender a Estrutura Existente
```
Ler:
- src/components/NewsCard.jsx (componente base)
- src/components/NewsGrid.jsx (exemplo de grid)
- src/hooks/useNewsByCategory.js (filtragem)
- src/pages/Home.jsx (onde será integrado)
- public/data/news.json (estrutura dos dados)
```

### Passo 3: Criar CategorySection
```jsx
// src/components/CategorySection.jsx
export default function CategorySection({ 
  category,        // string: "ECONOMIA"
  featuredNewsId   // number: ID da manchete (para excluir)
}) {
  const { news, loading, error } = useNewsByCategory(
    category, 
    { exclude_ids: [featuredNewsId] }
  );
  
  // Renderizar:
  // - H2 com título da categoria (verde Brasil)
  // - Grid de até 4 cards (NewsCard)
  // - Link "Ver todas" (verde botão)
  // - Estados (loading, error, empty)
}
```

### Passo 4: Integrar na Home
```jsx
// src/pages/Home.jsx
function Home() {
  const { featuredNews, news: secondaryNews } = useNews();
  
  return (
    <>
      <NewsFeatured news={featuredNews} />
      <NewsGrid news={secondaryNews} />
      
      {/* NOVO - Feature 003 */}
      {CATEGORIES.map(category => (
        <CategorySection 
          key={category}
          category={category}
          featuredNewsId={featuredNews?.id}
        />
      ))}
    </>
  );
}
```

### Passo 5: Estilo com Tailwind
```jsx
// Colors
- bg-green-brasil (custom: #228B22)
- bg-yellow-brasil (custom: #FFD700)
- text-blue-marinho (custom: #001A4D)
- bg-gray-50 (neutral #F5F5F5)

// Layout
- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- gap-4
- p-6 md:p-8
- mb-12

// Typography
- text-2xl font-bold (H2)
- truncate (limitar linhas)

// Button "Ver Todas"
- px-6 py-3 rounded bg-green-brasil text-white
- hover:bg-yellow-brasil transition-colors
```

### Passo 6: Testar
```bash
# Rodar dev
npm run dev
# Abrir http://localhost:5173

# Rodar testes
npm run test

# Verificar performance
npm run build
# Analisar bundle size

# Verificar acessibilidade (Lighthouse)
# Chrome DevTools → Lighthouse → Accessibility
```

### Passo 7: Refinar & Submit PR
```bash
git add .
git commit -m "feat(003): adicionar seções de categorias na home"
git push origin 003-secoes-categorias

# Abrir PR em GitHub
```

---

## 📊 Key Files & Locations

| Arquivo | Localização | Propósito |
|---------|-----------|----------|
| **CategorySection.jsx** | `src/components/CategorySection.jsx` | Componente novo |
| **Home.jsx** | `src/pages/Home.jsx` | Integração |
| **useNewsByCategory.js** | `src/hooks/useNewsByCategory.js` | Hook existente (extend) |
| **NewsCard.jsx** | `src/components/NewsCard.jsx` | Reutilizar (não modificar) |
| **constants.js** | `src/utils/constants.js` | CATEGORIES array |
| **news.json** | `public/data/news.json` | Dados |
| **Design System** | `DESIGN_SYSTEM.md` | Cores, tipografia |
| **Spec** | `specs/003-secoes-categorias/spec.md` | Referência detalhada |

---

## 🎨 Design Quick Reference

### Cores (Paleta Brasil)
```css
Verde Brasil:    #228B22  (títulos H2)
Amarelo Brasil:  #FFD700  (button hover, badges)
Azul Marinho:    #001A4D  (text badge)
Cinza Neutro:    #F5F5F5  (bg alternado)
Branco:          #FFFFFF  (bg padrão)
```

### Tipografia
```css
H2 (Categoria):  24px, weight 700, Verde Brasil
Body:            16px, weight 400, Azul Marinho ou Cinza
Label (Badge):   12px, weight 600, Azul Marinho sobre Amarelo
```

### Spacing
```css
Entre Seções:    48px (3rem)
Entre Cards:     16px
Padding Seção:   24px (p-6)
```

---

## 🔗 Como Funciona o Fluxo

```
1. Home carrega → useNews() fetch news.json
   ↓
2. Home renderiza:
   • NewsFeatured (manchete) → id=42 (exemplo)
   • NewsGrid (4 cards secundários)
   ↓
3. Para cada CATEGORIA em CATEGORIES:
   • CategorySection renderiza
   ↓
4. Dentro de CategorySection:
   • useNewsByCategory(categoria, {exclude_ids: [42]})
   • Filtra notícias por categoria
   • Remove id=42 (manchete)
   • Pega top 4 por data
   • Renderiza grid com NewsCard
   ↓
5. Link "Ver todas" → navega para /categories/economia
   ↓
6. CategoryPage renderiza com todos os resultados daquela categoria

```

---

## ⚡ Performance Tips

1. **Lazy Loading**: Adicionar `loading="lazy"` em imagens
   ```jsx
   <img src={news.imagem} loading="lazy" />
   ```

2. **Memoização**: Usar `useMemo` em useNewsByCategory
   ```jsx
   const filtered = useMemo(() => {
     // filtragem aqui
   }, [category, allNews, exclude_ids])
   ```

3. **Evitar Renders**:  Props bem estruturadas para evitar re-renders
   ```jsx
   // BOM
   <CategorySection category={category} featuredNewsId={id} />
   
   // RUIM (objeto novo a cada render)
   <CategorySection data={{ cat: category, ... }} />
   ```

---

## ♿ Accessibility Checklist

Enquanto desenvolve, verificar:

- [ ] H2 com aria-level correto
- [ ] Links com texto descritivo (não "Clique aqui")
- [ ] Button com `{...getProps()}` ou semântico
- [ ] Contraste testado (WebAIM > 4.5:1)
- [ ] Navegação por Tab funciona
- [ ] Leitor de tela consegue ler tudo

---

## 🧪 Testing Checklist

- [ ] Home renderiza sem erros
- [ ] 8 seções aparecem
- [ ] Manchete não aparece em nenhuma seção
- [ ] Links "Ver todas" navegam certo
- [ ] Responsividade: 1 col mobile, 2 tablet, 4 desktop
- [ ] Loading e error states funcionam
- [ ] Sem duplicações de IDs
- [ ] Bundle size OK (< +5%)
- [ ] FCP < 1.5s (3G)
- [ ] Lighthouse > 90

---

## 🐛 Common Issues & Solutions

| Problema | Solução |
|----------|---------|
| Manchete aparece em seção | Passar `featuredNewsId` e filtrar em hook |
| Grid quebrado em mobile | Verificar Tailwind config, usar `grid-cols-1` |
| Imagens fora do ratio | Adicionar aspect-ratio CSS ou container query |
| Link "Ver todas" não funciona | Verificar route em React Router e slug normalization |
| Carregamento lento | Adicionar lazy loading, memoização, code split |
| Contraste ruim | Testar com WebAIM checker, ajustar cores |
| Screen reader confuso | Adicionar aria-labels, verificar heading hierarchy |

---

## 📚 References

- [Full Spec](./spec.md) - Especificação completa
- [Plan](./plan.md) - Timeline e estratégia
- [Design System](../../DESIGN_SYSTEM.md) - Cores, tipografia
- [Feature 001 Spec](../001-exibicao-home/spec.md) - Home anterior
- [Feature 002 Spec](../002-header-navbar/spec.md) - Header

---

## ❓ Questions?

- Não sabe como usar `useNewsByCategory`? Leia o hook original
- Dúvida sobre NewsCard? Abra o componente ou teste no Storybook
- Estilo Tailwind? Consulte o `tailwind.config.js` ou [documentação oficial](https://tailwindcss.com)
- Acessibilidade? Veja [WCAG Guidelinesl](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✨ Good Luck!

Você tem tudo que precisa. Comece criando `CategorySection.jsx` integre na Home. Teste em 3 viewports, valide acessibilidade, e envie a PR! 🚀

