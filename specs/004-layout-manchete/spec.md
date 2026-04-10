# Especificação: Layout da Manchete Principal (Feature 004)

**Data**: 2 de abril de 2026  
**Status**: 🔄 Em especificação  
**Feature ID**: 004-layout-manchete

---

## 📋 Resumo Executivo

Redesenhar o componente `NewsFeatured` para implementar um layout responsivo em 2 colunas:
- **Coluna esquerda (2/3)**: Carrossel dinâmico com controles de navegação (setas)
- **Coluna direita (1/3)**: 2 notícias estáticas empilhadas
- Todas as imagens como background com `object-fit: cover`
- Gradiente linear preto na base de cada item
- Textos brancos sobrepostos na parte inferior esquerda
- Altura total da coluna direita = altura do carrossel

---

## 🎯 Objetivos

1. ✅ Criar componente `FeaturedCarousel.jsx` para gerenciar o carrossel dinâmico
2. ✅ Criar componente `FeaturedSidebar.jsx` para as 2 notícias estáticas
3. ✅ Refatorar `NewsFeatured.jsx` para usar o novo layout
4. ✅ Implementar navegação do carrossel (setas anterior/próxima)
5. ✅ Garantir responsividade
6. ✅ Atualizar estilos com gradientes e overlay de texto

---

## 📐 Especificações de Design

### Layout Principal
```
┌─────────────────────────────────────────┐
│          MANCHETE PRINCIPAL             │
├──────────────────────────┬──────────────┤
│                          │              │
│    CARROSSEL (2/3)       │   NOTÍCIA 1  │
│   [◄ SLIDE 1 ►]          │   (1/3)      │
│                          │              │
│                          ├──────────────┤
│  Altura: H               │              │
│                          │   NOTÍCIA 2  │
│                          │   (1/3)      │
│                          │              │
│                          │ Altura = H   │
└──────────────────────────┴──────────────┘
```

### Componentes Detalhes

#### Carrossel (2/3)
- Altura: TBD (via CSS var ou prop)
- Múltiplas notícias em rotação
- Setas de navegação (◄ ►) no centro lateral
- Indicadores/dots opcionais
- Auto-play opcional (configurável)

#### Sidebar (1/3)
- 2 notícias estáticas
- Cada notícia ocupa 50% da altura total
- Mesmo height do carrossel
- Stack vertical

#### Imagens
- Background image com `background-image: url(...)`
- `background-size: cover`
- `background-position: center`
- Overlay degradê preto (0% → 100% de opacidade)

#### Textos
- Título (H1 ou H2)
- Resumo (opcional)
- Byline (autor • data • fonte)
- Posição: bottom-left
- Padding: 1.5rem (24px)
- Cor: white
- Z-index: 10 (acima do gradiente)

---

## 🎨 Estilos CSS

### Container Principal
```css
.featured-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  height: auto; /* ou height customizado */
  max-width: 1280px;
  margin: 0 auto;
}
```

### Carrossel
```css
.featured-carousel {
  position: relative;
  height: 500px; /* TBD - definirei no plan */
  border-radius: 12px;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.carousel-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%; /* Área para gradiente */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem; /* ou right: 1rem */
  z-index: 20;
}
```

### Sidebar
```css
.featured-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 500px; /* Iguala carrossel */
}

.sidebar-item {
  flex: 1;
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem; /* gap entre itens */
}
```

### Textos Sobrepostos
```css
.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 10;
  color: white;
}

.featured-title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.featured-byline {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

---

## 📱 Responsividade

### Desktop (md: 768px+)
- Layout 2 colunas (2fr 1fr)
- Altura mínima: 500px

### Tablet (sm: 640px)
- Layout 2 colunas mantido
- Altura reduzida: 350px

### Mobile (< 640px)
- Coluna única (1fr)
- Carrossel + Sidebar empilhados
- Altura: auto

---

## 🧩 Dependências

### Hooks
- `useState` - Gerenciar índice do slide
- `useEffect` - Auto-play do carrossel
- `useRef` - Referências para animações

### Bibliotecas
- React Icons (FaChevronLeft, FaChevronRight) - Setas do carrossel
- Nenhuma biblioteca externa de carrossel (build custom)

### Componentes Existentes
- `NewsFeatured.jsx` - Será refatorado
- `useNews.js` - Hook para buscar notícias

---

## 📊 Fonte de Dados

Usar `useNews()` hook para buscar notícias:

```javascript
const news = useNews() // Array de notícias

// Carrossel: news[0] será o slide inicial
// Sidebar: news[1] e news[2]
```

Alternativa: Adicionar propriedades no JSON:
```json
{
  "id": "1",
  "titulo": "...",
  "imagem": "...",
  "destaque": true, // Para manchete
  "carousel": true   // Para carrossel
}
```

---

## ✅ Critérios de Aceitação

- [ ] Carrossel exibe notícias em rotação
- [ ] Setas anterior/próxima funcionam
- [ ] Sidebar exibe 2 notícias estáticas
- [ ] Altura total sidebar = altura carrossel
- [ ] Gradiente preto na base de cada item
- [ ] Textos brancos sobrepostos (título, resumo, byline)
- [ ] Responsivo (Desktop, Tablet, Mobile)
- [ ] Auto-play funciona (opcional)
- [ ] Sem "flashing" ou transições abruptas
- [ ] Acessibilidade: aria-labels, alt-text, semantic HTML
- [ ] Build < 1.5x tamanho anterior
- [ ] Zero console warnings/errors

---

## 🔄 Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 2026-04-02 | 1.0 | Especificação inicial |
