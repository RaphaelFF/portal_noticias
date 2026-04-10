# Feature Specification: Seções de Categorias na Home

**Feature Branch**: `003-secoes-categorias`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "Como leitor, quero visualizar seções dinâmicas de cada categoria de notícias na Home page para explorar conteúdo de diferentes áreas de interesse sem sair da página inicial."

---

## 📌 Visão Geral da Feature

A Feature 003 adiciona à página Home do Portal de Notícias **seções dinâmicas para cada uma das 8 categorias** (ÚLTIMAS NOTÍCIAS, CULTURA, ECONOMIA, EDUCAÇÃO, ESPORTES, MEIO AMBIENTE, POLÍTICA, SAÚDE), mostrando as notícias mais recentes de cada categoria em um layout responsivo e acessível.

**Objetivo Funcional**: Melhorar a experiência de navegação, permitindo que leitores descubram conteúdo de diferentes categorias sem precisar navegar para páginas separadas, aumentando o engajamento e o tempo de permanência.

**Contexto no Projeto**: 
- Segue a Feature 001 (Manchete Principal + Grid Secundário) e é complementar a ela
- Utiliza design system implementado (paleta Brasil: Verde #228B22, Amarelo #FFD700, Azul #001A4D)
- Reutiliza componentes NewsCard, NewsGrid, e hook useNewsByCategory já existentes
- Dados: `public/data/news.json` com campo "categoria" em cada notícia

---

## 👥 User Stories & Acceptance Scenarios *(mandatory)*

### **User Story 1 - Explorar Categorias na Home (Priority: P1)**

Como leitor, quero visualizar as notícias mais recentes de cada categoria em seções organizadas na home, para descobrir conteúdo relevante sem abandoar a página inicial.

**Why this priority**: É uma das features principais que melhora significativamente a experiência de navegação e engajamento. Aumenta a taxa de cliques e tempo de permanência. Sem ela, leitores precisam navegar manualmente entre categorias.

**Independent Test**: Pode ser totalmente testado carregando a home e verificando que as 8 seções aparecem corretamente, cada uma com suas notícias filtradas. Entrega valor ao leitor mesmo sem a paginação ou filtros avançados.

**Acceptance Scenarios**:

1. **Given** leitor acessa a home com dados carregados, **When** página renderiza após manchete principal, **Then** aparecem 8 seções claramente separadas, uma para cada categoria, em ordem consistente (ÚLTIMAS NOTÍCIAS, CULTURA, ECONOMIA, EDUCAÇÃO, ESPORTES, MEIO AMBIENTE, POLÍTICA, SAÚDE)

2. **Given** uma seção de categoria está visível, **When** leitor observa o layout, **Then** vê título da categoria como heading (H2), até 4 notícias em cards, spacing consistente entre cards, e um link "Ver todas as notícias da categoria"

3. **Given** leitor está na home em desktop (1024px+), **When** seções de categorias carregam, **Then** cards aparecem em layout de 4 colunas com espaçamento de 16px entre eles

4. **Given** leitor está na home em tablet (768px-1023px), **When** seções de categorias carregam, **Then** cards aparecem em layout de 2 colunas

5. **Given** leitor está na home em mobile (< 768px), **When** seções de categorias carregam, **Then** cards aparecem em layout de 1 coluna (stack vertical) com full width

---

### **User Story 2 - Links "Ver Todas" Funcionais (Priority: P1)**

Como leitor, quero um link "Ver todas as notícias" em cada seção que me leve para a página completa daquela categoria, para acessar facilmente todos os artigos de um tema que me interessa.

**Why this priority**: O link "Ver todas" é o ponto de saída das seções para páginas de categoria dedicadas. Sem ele, leitores não conseguem acessar o acervo completo. É crítico para a navegação.

**Independent Test**: Pode ser testado clicando no link "Ver todas" de cada seção e verificando que leva para a url correta (ex: `/categories/economia`) com parâmetros corretos na URL. Funciona de forma independente de outras features.

**Acceptance Scenarios**:

1. **Given** uma seção de categoria está renderizada, **When** leitor localiza o link "Ver todas as notícias da [Categoria]", **Then** o link é visivelmente clicável com estilo button verde (#228B22) com hover amarelo (#FFD700)

2. **Given** leitor clica no link "Ver todas", **When** navegação ocorre, **Then** é redirecionado para `/categories/[slugcategoria]` (ex: `/categories/economia`) com a página CategoryPage renderizada

3. **Given** link "Ver todas" está visível, **When** leitor interage com ele, **Then** transição visual é suave sem layout shift, mantendo a scroll position relativa

4. **Given** leitor está em mobile e clica em "Ver todas", **When** página de categoria carrega, **Then** carrega em full viewport sem comportamentos inesperados (ex: zoom não muda)

---

### **User Story 3 - Sem Duplicação de Notícias (Priority: P1)**

Como leitor, quero que notícias já exibidas na manchete principal não apareçam repetidas nas seções de categorias, para não ter uma experiência redundante.

**Why this priority**: Evitar duplicação é um requisito de qualidade que melhora a experiência e demonstra atenção ao detalhe. Leitores deveriam descobrir novos conteúdos em cada seção, não rever o que já viram.

**Independent Test**: Pode ser testado comparando o `id` da notícia exibida na manchete com todos os cards das seções. Se houver duplicação, o teste falha. Testável sem efeitos colaterais em outras features.

**Acceptance Scenarios**:

1. **Given** manchete principal exibe uma notícia (ex: id=42), **When** seções de categorias carregam, **Then** essa mesma notícia não aparece em nenhuma das seções de categoria mesmo que ela pertença àquela categoria

2. **Given** filtragem por categoria ocorre, **When** notícias são selecionadas, **Then** a lógica remove a manchete do resultado antes de exibir os cards de categoria

3. **Given** manchete é atualizada para uma notícia diferente, **When** página re-renderiza, **Then** a nova manchete é excluída das seções, e a notícia anterior pode voltar a aparecer normalmente

---

### **User Story 4 - Design System Aplicado (Priority: P2)**

Como leitor, quero que as seções de categorias sigam a identidade visual do portal com cores Brasil e design consistente, para manter uma experiência visual coerente e profissional.

**Why this priority**: Consistência visual é importante para reconhecimento de marca e profissionalismo. Sem ele, a página fica desalinhada. É P2 porque não bloqueia funcionalidade, mas é necessária para a UI final.

**Independent Test**: Pode ser testado com ferramentas de inspeção de CSS e screenshots (visual regression testing) comparando com o design system. Testável de forma isolada.

**Acceptance Scenarios**:

1. **Given** seção de categoria está renderizada, **When** leitor observa o título, **Then** está em verde Brasil (#228B22), peso 700 bold, tamanho 24px (H2), line-height 1.4

2. **Given** cards estão em uma seção, **When** leitor vê o layout, **Then** cards seguem o estilo NewsCard existente (imagem, título, resumo, metadata de data/autor)

3. **Given** link "Ver todas" está visível, **When** leitor vê o estilo, **Then** é um button com background verde (#228B22), texto branco, padding 12px 24px, border-radius 6px, hover muda para amarelo (#FFD700) com transição suave 200ms

4. **Given** duas seções estão adjacentes, **When** leitor visualiza spacing, **Then** há 48px (3rem) de espaçamento vertical entre seções

5. **Given** sections alternam visualmente, **When** leitor visualiza o fundo, **Then** seções pares têm background #F5F5F5 (cinza neutro) e seções ímpares têm background #FFFFFF (branco) para melhor visual hierarchy

6. **Given** card está renderizado, **When** há uma categoria associada, **Then** a categoria aparece como badge em amarelo (#FFD700) com texto azul marinho (#001A4D) no canto superior direito do card

---

### **User Story 5 - Responsividade Sem Quebras (Priority: P2)**

Como leitor em qualquer dispositivo (mobile, tablet, desktop), quero que o layout se adapte mantendo usabilidade e legibilidade sem comportamentos inesperados, para consumir notícias confortavelmente.

**Why this priority**: Responsividade é mandatória no projeto e em qualquer portal moderno. Mobile-first é uma prioridade. P2 aqui porque é requisito presente desde outras features, não é novo, apenas expandido.

**Independent Test**: Pode ser testado em diferentes viewports (375px, 768px, 1024px, 1440px) verificando breakpoints, proporcionalidade, e ausência de scroll horizontal indesejado. Testável com Webdriver ou ferramentas visuais.

**Acceptance Scenarios**:

1. **Given** seções carregam em mobile (< 768px), **When** viewport é de 375px, **Then** cards estão em 1 coluna com full-width (20px padding lateral), títulos truncam em 2 linhas max, sem overflow de texto

2. **Given** seções carregam em tablet (768px-1023px), **When** viewport é de 800px, **Then** cards estão em 2 colunas com gap 16px, títulos truncam em 2 linhas max

3. **Given** seções carregam em desktop (1024px), **When** viewport é 1200px+, **Then** cards estão em 4 colunas com gap 16px, títulos podem usar até 3 linhas com ellipsis

4. **Given** imagens de cards carregam em qualquer viewport, **When** imagem renderiza, **Then** aspect ratio 16:9 é mantido, sem distorts ou ratio shifts

---

### **User Story 6 - Performance e Carregamento (Priority: P2)**

Como leitor com conexão lenta, quero que as seções de categorias carreguem de forma otimizada sem bloquear a experiência, para acessar as notícias rapidamente mesmo em 3G.

**Why this priority**: Performance é mandatória no projeto (meta < 1.5s FCP). Importante para experiência, especialmente em mercados com conexões variadas. P2 aqui porque a Feature 001 já tem otimizações, esta estende.

**Independent Test**: Pode ser testado simulando 3G (throttling 400ms latência, 1.6Mbps), medindo FCP, LCP, CLS. Testável com Lighthouse, WebPageTest ou Playwright.

**Acceptance Scenarios**:

1. **Given** home carrega em conexão 3G simulada, **When** usuário acessa a página, **Then** manchete carrega e é interativa em < 1.5s (incluindo seções visíveis)

2. **Given** seções de categorias são renderizadas, **When** cards carreg, **Then** imagens usam lazy loading nativo (`loading="lazy"`) ou Intersection Observer, não bloqueando o resto do carregamento

3. **Given** múltiplas seções estão na página, **When** hook useNewsByCategory filtra notícias, **Then** resultado é memoizado com `useMemo()` para evitar recálculos desnecessários a cada render

4. **Given** imagens dos cards carregam, **When** elas renderizam, **Then** "cumulative layout shift (CLS)" causado pelo carregamento é < 0.1 (excelente), sem jumps visuais

5. **Given** build do projeto ocorre, **When** nova feature é compilada, **Then** aumento de bundle size é < 5% com relação ao antes

---

### **User Story 7 - Estados de Carregamento e Erro (Priority: P1)**

Como leitor, quero ver indicadores visuais de carregamento e mensagens úteis em caso de erro, para compreender o que está acontecendo enquanto espero.

**Why this priority**: UX states são críticas. Sem eles, leitores ficam confusos ou acham que o site quebrou. Deve ser implementado desde o início.

**Independent Test**: Pode ser testado mockando latências de API e erros, verificando que loading spinners aparecem e mensagens de erro são exibidas. Testável com ferramentas de mock.

**Acceptance Scenarios**:

1. **Given** seção de categoria está sendo carregada, **When** dados não chegaram ainda, **Then** aparece skeleton loader ou spinner suave (não piscante, acessível) no lugar do grid de cards

2. **Given** seção está em estado de erro (ex: API falhou), **When** leitor visualiza a seção, **Then** aparece mensagem gentil "Não conseguimos carregar as notícias de [Categoria] no momento. Tente novamente mais tarde." com opcional botão "Tentar novamente"

3. **Given** categoria tem notícias mas conexão falhou parcialmente, **When** página renderiza, **Then** algumas seções carregam normalmente enquanto outras mostram erro, sem bloquear toda a página

4. **Given** leitor clica em "Tentar novamente" após erro, **When** requisição é feita, **Then** componente re-renderiza tentando carregar os dados novamente

---

### **User Story 8 - Acessibilidade Completa (Priority: P1)**

Como leitor com deficiências visuais ou usando leitura de tela, quero que as seções sejam completamente acessíveis, para consumir o conteúdo sem barreiras.

**Why this priority**: O projeto enfatiza acessibilidade (WCAG AA mínimo). É mandatório, P1 porque impacta inclusão.

**Independent Test**: Pode ser testado com leitura de tela (NVDA, JAWS), navegação por teclado (Tab, arrows), e ferramentas como axe, Lighthouse. Testável sem dependências.

**Acceptance Scenarios**:

1. **Given** seção de categoria está renderizada, **When** leitor de tela percorre, **Then** ordem é: "Heading 2: [NomeDaCategoria]", seguido de list de "4 articles" (ou quantas houver), cada um com link "Read article: [Título]", depois linha com link "View all [Categoria] news"

2. **Given** link "Ver todas" está visível, **When** leitor de tela foca nele, **Then** aria-label clara: "Ver todas as notícias de [Categoria]" (ou auto via button text se estruturado bem)

3. **Given** seções estão na página, **When** leitor navega com Tab, **Then** ordem é lógica (seção 1 → 2 → 3 etc.), sem jumps ou loops, primeiro card focável é visível

4. **Given** card está em foco com teclado, **When** tecla Enter ou Space é pressionada, **Then** página navega para o artigo

5. **Given** cores são usadas (verde, amarelo, azul), **When** contraste é medido, **Then** texto sobre fundo obedece WCAG AA mínimo 4.5:1 para texto normal, 3:1 para texto grande

6. **Given** seção com categoria tem badge, **When** leitor de tela lê, **Then** categoria não aparece como texto duplicado, apenas no card metadata (estrutura semântica clara)

7. **Given** seção está em loading, **When** leitor de tela está na página, **Then** aria-live ou aria-busy comunica o estado ("Carregando notícias de Economia")

---

## 🔧 Edge Cases

1. **O que acontece se uma categoria não tiver notícias?**
   - Mostrar seção com título, grid vazio com mensagem gentil: "Nenhuma notícia disponível nesta categoria no momento. Volte mais tarde para novidades de [Categoria]."

2. **E se houver menos de 4 notícias em uma categoria?**
   - Exibir apenas as notícias disponíveis (1, 2 ou 3) sem deixar espaços vazios ou placeholders. Grid adapta o número de colunas dinamicamente.

3. **E se a manchete fizer parte de uma categoria mas ser a única notícia dela?**
   - Seção dessa categoria fica vazia (mostra mensagem "Nenhuma notícia..." ), pois a manchete é excluída da filtragem.

4. **Como o sistema se comporta com notícias muito longas (título > 3 linhas)?**
   - Limita a 2-3 linhas com `line-clamp` CSS, adiciona ellipsis (...) no final. NewsCard já deve ter essa propriedade.

5. **E se a imagem de uma notícia não carregar?**
   - Mostra placeholder cinza (#F5F5F5) com ícone genérico (📰), mantém aspect ratio 16:9, sem quebra de layout (skeleton ou baixo de imagem deve ter height fixed).

6. **Como a página se comporta se houver 200 notícias no JSON?**
   - Cada seção pega apenas as 4 mais recentes (filtra, ordena por data DESC, pega top 4). Resto não é renderizado na home, apenas na CategoryPage.

7. **E se usuário estiver em uma categoria e voltar para home?**
   - Home renderiza normalmente. Se o array de categorias mudar de ordem, a home respira as mesmas proporções.

8. **Como funciona lazy loading com scroll?**
   - Seções abaixo do fold não precisam carregar imagens até user fizer scroll. Observer ativa `loading="lazy"` nativo ou lazy-loads via intersection observer.

9. **E se a categoria tiver caracteres especiais no slug (ex: "MEIO AMBIENTE")?**
   - Slug deve ser normalizado: `meio-ambiente` (lowercase, sem espaços/acentos). useNewsByCategory já deveria fazer isso.

10. **O que acontece em tela pequena (320px)?**
    - Layout collapsa para 1 coluna, cards mantêm proporcionalidade, sem horizontal scroll. Títulos truncam a 1-2 linhas se necessário.

---

## 📋 Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEVE exibir **8 seções de categorias** na home, uma para cada categoria (ÚLTIMAS NOTÍCIAS, CULTURA, ECONOMIA, EDUCAÇÃO, ESPORTES, MEIO AMBIENTE, POLÍTICA, SAÚDE) em ordem consistente, abaixo da manchete e grid secundário

- **FR-002**: Cada seção DEVE exibir **até 4 notícias mais recentes** (filtradas por categoria, ordenadas por `data_publicacao` DESC), usando componente NewsCard

- **FR-003**: Cada seção DEVE incluir um **link "Ver todas as notícias de [Categoria]"** que navega para `/categories/[slug-categoria]` (ex: `/categories/economia`)

- **FR-004**: Sistema DEVE **excluir a manchete principal** de todas as seções de categorias mesmo que ela pertença àquela categoria (sem duplicação)

- **FR-005**: Cada seção DEVE ser **responsiva** com layout adaptável:
  - Mobile (< 768px): 1 coluna
  - Tablet (768px - 1023px): 2 colunas
  - Desktop (1024px+): 4 colunas

- **FR-006**: Sistema DEVE **filtrar notícias por categoria** usando o hook `useNewsByCategory` existente, sem criar novas dependências

- **FR-007**: Cada seção DEVE incluir **estado de carregamento** (skeleton/spinner) enquanto dados não chegam, e **estado de erro** com mensagem "Não conseguimos carregar..." e botão "Tentar novamente"

- **FR-008**: Categoria sem notícias disponíveis DEVE exibir **mensagem de vazio gentil**: "Nenhuma notícia disponível nesta categoria no momento. Volte mais tarde para novidades de [Categoria]."

- **FR-009**: Sistema DEVE aplicar **memoização** (useMemo) ao resultado de filtragem de notícias por categoria para evitar recálculos desnecessários

- **FR-010**: Imagens dos cards DEVE usar **lazy loading nativo** (`loading="lazy"`) ou Intersection Observer para não bloquear carregamento

- **FR-011**: Sistema DEVE manter **ordem das categorias consistente** com o array `CATEGORIES` em `constants.js`

### Design Requirements

- **DES-001**: Títulos de categoria (H2) com cor verde Brasil (#228B22), weight 700, tamanho 24px, line-height 1.4

- **DES-002**: Cards seguem estilo existente de NewsCard (imagem aspect-ratio 16:9, título truncado 2-3 linhas, resumo opcional, metadata data/autor)

- **DES-003**: Link "Ver todas" com estilo button:
  - Background: Verde Brasil (#228B22)
  - Texto: Branco
  - Padding: 12px 24px
  - Border-radius: 6px
  - Hover: Background amarelo (#FFD700), transição 200ms

- **DES-004**: Espaçamento entre seções: 48px (3rem) vertically

- **DES-005**: Seções alternam background:
  - Seções pares (2, 4, 6, 8): #F5F5F5 (cinza neutro) com padding 24px
  - Seções ímpares (1, 3, 5, 7): #FFFFFF (branco) com padding 24px

- **DES-006**: Badge de categoria no card (canto superior direito):
  - Background: Amarelo Brasil (#FFD700)
  - Texto: Azul Marinho (#001A4D)
  - Tamanho: 12px regular, weight 600
  - Padding: 4px 8px
  - Border-radius: 4px

- **DES-007**: Grid de cards com gap 16px (horizontal e vertical no responsive)

### Performance Requirements

- **PERF-001**: Lazy loading de imagens com `loading="lazy"` nativo

- **PERF-002**: Filtragem de notícias por categoria DEVE usar `useMemo` para memoizar resultado

- **PERF-003**: Cumulative Layout Shift (CLS) causado por carregamento de imagens < 0.1 (excelente). Imagens devem ter `height` fixed (aspect-ratio CSS ou container)

- **PERF-004**: Aumento de bundle size < 5% com relação ao build anterior (analisar com `npm run build` e tomar medidas se exceder)

- **PERF-005**: FCP (First Contentful Paint) da home com seções visíveis deve permanecer < 1.5s em conexão 3G simulada

### Accessibility Requirements

- **ACC-001**: Links "Ver todas" com `aria-label` clara: "Ver todas as notícias de [Categoria]" ou bem estruturado no DOM

- **ACC-002**: Heading hierarchy correta:
  - H1: Manchete principal
  - H2: Títulos de categoria
  - H3: Títulos dos cards (se usados, senão apenas article headings)

- **ACC-003**: Contraste mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande) em todas as combinações de cor/fundo

- **ACC-004**: Navegação por teclado funcional: Tab navega entre seções e links, Enter/Space ativa botões, ordem lógica sem jumps

- **ACC-005**: Leitor de tela percebe semanticamente:
  - Seção como `<section>` ou `<article>`
  - Títulos com `<h2>`
  - Grid de cards como lista (`<ul>` / `<li>` ou `<article>` múltiplos)
  - Links com texto claro ("Ver todas as notícias de Economia" vs. vago "Saiba mais")

- **ACC-006**: Estados de carregamento/erro comunicados com `aria-live="polite"` ou `aria-busy="true"`

- **ACC-007**: Não usar cor como único meio de comunicar informação (ex: categoria só como cor, não como texto badge)

### Key Entities / Data Model

- **Notícia (News)**: Cada item em `public/data/news.json` com atributos:
  - `id`: Identificador único (string/number)
  - `titulo`: Título da notícia (obrigatório)
  - `slug`: URL amigável (ex: "economia-brasil-crescimento")
  - `categoria`: String matching array `CATEGORIES` (ex: "ECONOMIA")
  - `imagem`: URL absoluta da imagem de capa (obrigatória)
  - `resumo`: Descrição breve (recomendado, < 150 chars)
  - `data_publicacao`: ISO date string ou timestamp (obrigatório)
  - `autor`: String com nome do autor/fonte (recomendado)
  - `conteudo`: Texto completo (na página de detail, não na home)

- **Categoria**: String from array `CATEGORIES` em `src/utils/constants.js`:
  ```javascript
  CATEGORIES = [
    'ÚLTIMAS NOTÍCIAS',
    'CULTURA',
    'ECONOMIA',
    'EDUCAÇÃO',
    'ESPORTES',
    'MEIO AMBIENTE',
    'POLÍTICA',
    'SAÚDE'
  ]
  ```

- **Home Component**: Estende App/Home.jsx com:
  - Manchete principal (nesFeatured)
  - Grid secundário (NewsGrid - feature 001)
  - **8 seções dinâmicas de categorias** (nova feature 003)

---

## ✅ Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das 8 seções de categorias renderizam corretamente na home sem erros de console (zero uncaught exceptions, zero hydration mismatches)

- **SC-002**: Cada seção exibe exatamente as notícias esperadas (top 4 recentes da categoria, manchete excluída, ordenadas por data)

- **SC-003**: Links "Ver todas" de todas as 8 seções funcionam e redirecionam para a URL correta da categoria respectiva (`/categories/[slug]`)

- **SC-004**: Layout é responsivo e funcional em no mínimo 3 viewports (375px mobile, 800px tablet, 1200px desktop) sem horizontal scroll, overflow, ou distorção

- **SC-005**: Home carrega com imagens em lazy loading, sem bloquear FCP/LCP
  - Mobile 3G: FCP < 1.5s
  - Desktop 4G: FCP < 1s
  - CLS < 0.1 (excelente)

- **SC-006**: Build size aumenta no máximo 5% com respeito ao build anterior (medir com `npm run build`)

- **SC-007**: 95%+ das notícias carregam e exibem corretamente em mobile, tablet, desktop (sem imagem quebrada, sem texto overflow)

- **SC-008**: Navegação por teclado (Tab, Enter) funciona em todas as seções e links da home sem ficar presa ou pular

- **SC-009**: Leitor de tela (NVDA/JAWS no Windows, VoiceOver no Mac) consegue navegar toda a home e entender estrutura semântica (headings, links, order)

- **SC-010**: Contraste de cores mede 4.5:1+ em todos os pares texto/fundo (validar com ferramentas como WebAIM Checker)

- **SC-011**: Estados de carregamento (skeleton/spinner) e erro (mensagem) aparecem corretamente quando necessário

- **SC-012**: Teste automatizado passa para:
  - Renderização de seções (React Testing Library)
  - Links "Ver todas" navegam corretamente
  - Filtragem de notícias por categoria
  - Estados vazio/erro
  - Responsividade (visual regression com Percy ou similar)

---

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)

```
✓ Hook useNewsByCategory:
  - Filtra notícias corretamente por categoria
  - Retorna máximo 4 notícias
  - Exclui manchete (verificar ID)
  - Ordena por data (DESC)
  - Retorna [] em categoria sem notícias

✓ Componente `CategorySection`:
  - Renderiza com props corretas
  - Mostra estado loading
  - Mostra estado error com botão retry
  - Renderiza vazio com mensagem gentil
  - Links "Ver todas" têm href correto
  - Cards renderizam corretamente

✓ Responsividade:
  - 1 col em mobile
  - 2 cols em tablet
  - 4 cols em desktop
```

### Integration Tests

```
✓ Home.jsx:
  - Renderiza 8 seções
  - Manchete não aparece em nenhuma seção
  - Links "Ver todas" navegam para CategoryPage
  - Sem erros de console
```

### Visual Regression (Optional: Percy, Chromatic, etc.)

```
✓ Screenshots em 3 viewports (mobile, tablet, desktop)
✓ Comparar com padrão aprovado antes do merge
```

### Accessibility Tests (axe, Lighthouse)

```
✓ Lighthouse Accessibility score > 90
✓ axe violations: 0 críticas, máximo 2 menores
✓ Manual: Navegação com Tab, Enter funciona
✓ Manual: Leitor de tela consegue ler toda página
```

### Performance Tests (Lighthouse CI)

```
✓ FCP < 1.5s (3G)
✓ LCP < 2.5s
✓ CLS < 0.1
✓ TTI < 3.8s (3G)
```

---

## 📦 Implementation Notes

### Components to Create/Modify

1. **Novo Componente**: `CategorySection.jsx`
   - Props: `category` (string), `featuredNewId` (number para excluir manchete)
   - Estado: loading, error, newsItems
   - Renderiza: H2 título, Grid de cards, Link "Ver todas"
   - Usa: `useNewsByCategory(category)`

2. **Modificar**: `Home.jsx`
   - Adicionar loop sobre `CATEGORIES`
   - Renderizar `<CategorySection>` para cada
   - Passar `featuredNews.id` para excluir duplicação

3. **Modificar/Estender**: `useNewsByCategory` hook
   - Adicionar parâmetro `exclude_id` (opcional)
   - Filtrar notícias excluindo ID se passado
   - Adicionar `useMemo` para memoizar resultado

4. **Criar**: Variação de `NewsGrid` responsivo ou CSS utility para grid dinâmico (1/2/4 cols)

5. **Opcional**: `Skeleton.jsx` ou spinner de loading reutilizável

### Tailwind Classes (Potential)

```
Container/Section: 
  bg-white/gray-50, p-6 md:p-8, mb-12

Title (H2):
  text-2xl, font-bold, text-green-brasil (#228B22)

News Grid:
  grid, gap-4, md:gap-4, grid-cols-1 md:grid-cols-2 lg:grid-cols-4

Button "Ver Todas":
  px-6, py-3, bg-green-brasil, text-white, rounded, hover:bg-yellow-brasil, transition-all

Badge Categoria:
  text-xs, bg-yellow-brasil, text-blue-marinho, px-2, py-1, rounded, font-semibold
```

### Data Dependencies

- `public/data/news.json` (já existe)
- `src/utils/constants.js` → `CATEGORIES` array
- `src/hooks/useNewsByCategory.js` (já existe, apenas estender)
- `src/components/NewsCard.jsx` (reutilizar, já existe)

### No New External Dependencies Required

- React features nativas: `useMemo`, `useState`, `useEffect`
- Tailwind já configurado
- Vite já configurado
- Nenhuma lib de carrossel/slider necessária (grid estático)

---

## 📅 Timeline Estimate (Indicativo)

- **Design/Review**: 1 dia (revisão desta spec, aprovação stakeholders)
- **Implementation**: 2-3 dias (componentes, hooks, CSS)
- **Testing**: 1-2 dias (unit tests, visual, accessibility)
- **QA/Refinement**: 1 dia (ajustes, performance checks)
- **Total**: ~5-7 dias para entrega completa

---

## 🚀 Done Criteria

A Feature será considerada **DONE** quando:

1. ✅ Código com merge em `main` (commits atômicos, bem documentados)
2. ✅ Todos os testes passam (unit, integration, accessibility)
3. ✅ Performance dentro das métricas (FCP, CLS, bundle size)
4. ✅ Design System aplicado (cores, spacing, tipografia)
5. ✅ Acessibilidade validada (axe, Lighthouse > 90)
6. ✅ Responsividade testada em 3+ viewports
7. ✅ Componentes documentados (storybook ou comentários JSDoc)
8. ✅ Sem erros de console ou warnings
9. ✅ Stakeholders aprovaram visualmente
10. ✅ Documentação atualizada (README, componentes)

---

## 📌 Related Documents

- **Design System**: [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) - Paleta cores, tipografia, componentes base
- **Feature 001 - Home**: [specs/001-exibicao-home/spec.md](../001-exibicao-home/spec.md) - Manchete e grid secundário
- **Feature 002 - Header**: [specs/002-header-navbar/spec.md](../002-header-navbar/spec.md) - Navegação e header
- **Data Model**: [specs/001-exibicao-home/data-model.md](../001-exibicao-home/data-model.md) - Estrutura de notícias
- **Constants**: [src/utils/constants.js](../../src/utils/constants.js) - CATEGORIES array
- **Hooks**: [src/hooks/useNewsByCategory.js](../../src/hooks/useNewsByCategory.js) - Filtragem por categoria
- **Components**: [src/components/](../../src/components/) - NewsCard, NewsGrid, NewsFeatured

