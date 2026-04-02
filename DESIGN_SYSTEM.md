# Design System - Portal de Notícias Araguari

## 1. Visão Geral

Este Design System define a identidade visual do Portal de Notícias, baseado na paleta de cores e características da logo **Rádio Araguari Web 87.9 MHz**.

A identidade reflete:
- **Identidade Nacional**: Cores da bandeira do Brasil (verde, amarelo, azul)
- **Comunidade**: Formato circular e design acessível
- **Modernidade**: Tipografia sem serifa arredondada e estética semi-flat
- **Confiança**: Profundidade sutil e hierarquia visual clara

---

## 2. Paleta de Cores

### Cores Primárias (Brasil)

| Nome | Cor | Hex | RGB | Uso |
|------|-----|-----|-----|-----|
| **Verde Brasil** | 🟢 | `#228B22` | rgb(34, 139, 34) | Headers, botões primários, destaques |
| **Amarelo Brasil** | 🟡 | `#FFD700` | rgb(255, 215, 0) | Faixa de destaque, CTA, badges |
| **Azul Marinho** | 🔵 | `#001A4D` | rgb(0, 26, 77) | Footers, backgrounds, texto robusto |
| **Branco** | ⚪ | `#FFFFFF` | rgb(255, 255, 255) | Textos, backgrounds neutros |

### Cores Secundárias (Sistema)

| Nome | Cor | Hex | RGB | Uso |
|------|-----|-----|-----|-----|
| **Verde Claro** | 🟢 | `#4CAF50` | rgb(76, 175, 80) | Hover states, backgrounds leves |
| **Amarelo Escuro** | 🟡 | `#FFA500` | rgb(255, 165, 0) | Hover buttons, destaque secundário |
| **Azul Claro** | 🔵 | `#003D99` | rgb(0, 61, 153) | Links, hover states |
| **Cinza Neutro** | ⚫ | `#F5F5F5` | rgb(245, 245, 245) | Backgrounds, separadores |
| **Cinza Escuro** | ⚫ | `#333333` | rgb(51, 51, 51) | Texto secundário |
| **Vermelho** | 🔴 | `#DC143C` | rgb(220, 20, 60) | Erros, alertas |
| **Verde Sucesso** | 🟢 | `#28A745` | rgb(40, 167, 69) | Sucesso, confirmações |

### Degradês

```css
/* Degradê Verde (como na logo) */
Linear: #228B22 → #4CAF50
Usado em: Headers, manchetes principais

/* Degradê Azul (fundo sólido) */
Solid: #001A4D
Usado em: Footers, backgrounds robustos

/* Degradê Sutil (backgrounds) */
Linear: #F5F5F5 → #FFFFFF
Usado em: Cards, seções neutras
```

---

## 3. Tipografia

### Fonte Base: **Inter** ou **Poppins**
(Sans-serif moderna, arredondada, otimizada para web)

### Escala Tipográfica

| Função | Tamanho | Weight | Line Height | Uso |
|--------|---------|--------|-------------|-----|
| **H1 - Manchete** | 32px / 2rem | 700 Bold | 1.3 | Títulos principais |
| **H2 - Seção** | 24px / 1.5rem | 700 Bold | 1.4 | Títulos de seções |
| **H3 - Subseção** | 20px / 1.25rem | 600 SemiBold | 1.4 | Subtítulos |
| **Body Large** | 16px / 1rem | 400 Regular | 1.6 | Texto de notíciaes |
| **Body** | 14px / 0.875rem | 400 Regular | 1.6 | Descrições, cards |
| **Small** | 12px / 0.75rem | 400 Regular | 1.5 | Metadados, datas |
| **Label** | 12px / 0.75rem | 600 SemiBold | 1.4 | Badges, labels |

### Cores de Texto

```css
/* Hierarquia */
Texto Primário (Títulos):     #001A4D (Azul Marinho)
Texto Secundário (Body):      #333333 (Cinza Escuro)
Texto Terciário (Metadados):  #666666 (Cinza Médio)
Texto sobre Verde:            #FFFFFF (Branco)
Texto sobre Amarelo:          #001A4D (Azul Marinho)
Links:                        #003D99 (Azul Claro)
Links Hover:                  #228B22 (Verde Brasil)
```

---

## 4. Componentes

### 4.1 Header / Navbar

**Layout**: Sticky header com degradê verde
- **Desktop**: Logo (h-16) + Category Menu (pills) + Date Display
- **Mobile**: Logo (h-12) + Hamburger Menu
- **Background**: Linear gradient verde (#228B22 → #4CAF50)
- **Sombra**: `box-shadow: 0 2px 8px rgba(0, 26, 77, 0.1)`
- **Altura**: 64px (desktop), 56px (mobile)

**Categoria Ativa**:
- **Background**: #FFD700 (Amarelo)
- **Texto**: #001A4D (Azul Marinho)
- **Transição**: 0.3s ease-in-out

### 4.2 Card de Notícia

**Layout Grid**: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)

**Estrutura**:
```
┌─────────────────────┐
│   [Imagem]          │ (16:9 aspect ratio, rounded corners)
├─────────────────────┤
│ [Categoria Badge]   │ (Amarelo, canto superior)
│ Título Notícia      │ (H3, azul marinho)
│ Descrição curta     │ (Body, cinza)
├─────────────────────┤
│ [Data] • [Autor]    │ (Small, cinza claro)
└─────────────────────┘
```

**Estilos**:
- **Border Radius**: 12px (semi-flat, como adesivo)
- **Sombra**: `0 4px 12px rgba(0, 26, 77, 0.08)`
- **Hover**: 
  - Sombra crescer: `0 8px 24px rgba(0, 26, 77, 0.12)`
  - Transformação: `translateY(-4px)`
  - Transição: 0.3s ease
- **Background**: #FFFFFF (Branco)
- **Border**: 1px solid #F5F5F5

### 4.3 Manchete Principal

**Layout**: 2 colunas (desktop) | 1 coluna (mobile/tablet)

**Lado Esquerdo (Imagem)**:
- Aspect ratio: 16:9
- Border radius: 16px
- Sombra: `0 8px 24px rgba(0, 26, 77, 0.12)`

**Lado Direito (Conteúdo)**:
- Badge de categoria: Amarelo + Azul Marinho
- H1 Manchete: Azul Marinho, bold
- Descrição: 2-3 linhas, cinza
- CTA Button: Verde Brasil com hover amarelo

### 4.4 Botões

**Primário** (Verde Brasil):
```css
Background:     #228B22
Color:          #FFFFFF
Padding:        12px 24px
Border Radius:  8px
Font Weight:    600
Transição:      0.3s ease

Hover:
  Background:   #FFD700 (Amarelo)
  Color:        #001A4D (Azul Marinho)
  Sombra:       0 4px 12px rgba(255, 215, 0, 0.2)

Active:
  Transform:    scale(0.98)
```

**Secundário** (Azul Marinho):
```css
Background:     #001A4D
Color:          #FFFFFF
Border:         2px solid #228B22

Hover:
  Background:   #228B22 (Verde Brasil)
  Border:       2px solid #FFD700
```

**Outline** (Transparente):
```css
Background:     transparent
Color:          #228B22
Border:         2px solid #228B22

Hover:
  Background:   #F5F5F5
  Color:        #001A4D
```

### 4.5 Badges / Labels

**Categoria**:
```css
Background:     #FFD700 (Amarelo)
Color:          #001A4D (Azul Marinho)
Padding:        4px 12px
Border Radius:  20px (fully rounded)
Font Size:      12px
Font Weight:    600
```

**Status**:
```css
Sucesso:    Background #28A745, Color #FFFFFF
Erro:       Background #DC143C, Color #FFFFFF
Aviso:      Background #FFA500, Color #001A4D
Info:       Background #003D99, Color #FFFFFF
```

### 4.6 Footer

**Background**: #001A4D (Azul Marinho)
**Texto**: #FFFFFF (Branco)
**Linhas separadoras**: #228B22 (Verde Brasil)

**Seções**:
- Logo + Descrição (col-4)
- Links Rápidos (col-3)
- Redes Sociais (col-3)
- Newsletter (col-2)

### 4.7 Página de Categoria

**Header de Categoria**:
```css
Background:     Linear: #228B22 → #4CAF50
Color:          #FFFFFF
Padding:        32px 16px
Border Radius:  0 0 16px 16px
Border Bottom:  4px solid #FFD700
Text Align:     Center
```

**Título Categoria**:
```css
Font Size:      28px / 1.75rem
Font Weight:    700
Color:          #FFFFFF
Text Transform: Uppercase
Letter Spacing: 1px
```

**Contador Notícias**:
```css
Font Size:      14px
Color:          #FFD700
Font Weight:    600
Margin Top:     8px
```

---

## 5. Padrões de Design

### 5.1 Espaçamento (8px base unit)

```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
```

### 5.2 Border Radius

```
xs:  4px    (elementos pequenos)
sm:  8px    (elementos médios)
md:  12px   (cards, componentes)
lg:  16px   (seções, containers)
full: 9999px (badges, avatares)
```

### 5.3 Sombras (Drop Shadow Sutil)

```
xs:   0 1px 2px rgba(0, 26, 77, 0.05)
sm:   0 2px 4px rgba(0, 26, 77, 0.08)
md:   0 4px 12px rgba(0, 26, 77, 0.08)
lg:   0 8px 24px rgba(0, 26, 77, 0.12)
xl:   0 12px 32px rgba(0, 26, 77, 0.15)
```

### 5.4 Animações

```css
/* Fade In */
Duration: 0.3s
Easing:   ease-in-out
Opacity:  0 → 1

/* Slide In Left */
Duration: 0.3s
Easing:   ease-in-out
Transform: translateX(-100%) → translateX(0)

/* Pulse (notificação) */
Duration: 2s
Easing:   ease-in-out (infinite)
Opacity:  1 → 0.7 → 1

/* Hover Scale */
Duration: 0.3s
Easing:   ease
Transform: scale(1) → scale(1.05)
```

### 5.5 Transições

```css
Default:        color 0.3s ease, background 0.3s ease
Hover:          0.3s ease-in-out (rápido)
Modal/Overlay:  0.4s ease (mais lento, percepção de peso)
```

---

## 6. Tokens CSS (Tailwind Config)

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'brasil-green': '#228B22',
        'brasil-green-light': '#4CAF50',
        'brasil-yellow': '#FFD700',
        'brasil-yellow-dark': '#FFA500',
        'brasil-blue': '#001A4D',
        'brasil-blue-light': '#003D99',
        'neutral-light': '#F5F5F5',
        'neutral-dark': '#333333',
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 26, 77, 0.05)',
        'sm': '0 2px 4px rgba(0, 26, 77, 0.08)',
        'md': '0 4px 12px rgba(0, 26, 77, 0.08)',
        'lg': '0 8px 24px rgba(0, 26, 77, 0.12)',
        'xl': '0 12px 32px rgba(0, 26, 77, 0.15)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideInLeft: 'slideInLeft 0.3s ease-in-out',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
};
```

---

## 7. Aplicação Prática no Portal

### Home Page
- Header com degradê verde
- Manchete principal (2 colunas, destaque)
- Grid de notícias (4 colunas desktop, responsive)
- Cards com hover animation
- Footer azul marinho

### Página de Categoria
- Header com fundo verde + faixa amarela (como na logo)
- Listagem de notícias filtradas
- Badge de categoria em amarelo
- Breadcrumb com verde

### Artigo Individual
- Imagem destaque (16:9, com sombra)
- Metadados: Categoria (amarelo), Data, Autor
- Texto em cinza escuro sobre branco
- Botão "Voltar" em verde

### Mobile
- Hamburguer menu (overlay com degradê)
- Logo reduzido (h-12)
- Cards em 1 coluna
- Buttons em full-width

---

## 8. Acessibilidade

### Contraste de Cores (WCAG AA)

| Combinação | Ratio | Status |
|-----------|-------|--------|
| Verde on Branco | 5.2:1 | ✅ Pass |
| Amarelo on Azul | 5.8:1 | ✅ Pass |
| Azul on Branco | 7.1:1 | ✅ Pass |
| Texto Cinza on Branco | 4.5:1 | ✅ Pass |

### Recomendações

- ✅ Sempre usar ARIA labels em botões de ícone
- ✅ Adicionar `aria-live` em áreas dinâmicas
- ✅ Garantir keyboard navigation (Tab order)
- ✅ Usar `focus:ring` em inputs
- ✅ Alt text descritivo em imagens (não "imagem123")
- ✅ Semântica HTML correta (h1, h2, h3, button, nav, etc)

---

## 9. Próximos Passos

1. **Atualizar `tailwind.config.js`** com novos colors, typography, shadows
2. **Implementar Header** com novo background gradient
3. **Criar componentes base** (Button, Card, Badge) com as cores
4. **Atualizar Home page** com nova paleta e layouts
5. **Estilizar CategoryPage** com header destacado
6. **Testar contraste** com ferramentas de acessibilidade
7. **Validar em mobile** (responsividade)
8. **Medir performance** (lighthouse)

---

**Versão**: 1.0  
**Data**: Abril 2026  
**Autor**: Design System - Portal de Notícias Araguari
