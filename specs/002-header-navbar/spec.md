# Especificação: Header/Navbar - Portal de Notícias

## 📌 Visão Geral

Criar um header profissional e responsivo para o portal de notícias, com navegação intuitiva, menu hambúrguer mobile e menu de categorias.

---

## 👥 User Stories

### **US1: Como visitante, quero ver o logo/nome do portal no header**
**Contexto**: Ao chegar no portal, preciso identificar de qual rádio é
**AC (Critérios de Aceitação)**:
- ✅ Logo/nome "SuaLogo" (ou nome da rádio) é exibido no topo
- ✅ Logo é clicável e leva à home
- ✅ Logo é responsivo (maior em desktop, menor em mobile)
- ✅ Logo está centralizado ou à esquerda

### **US2: Como usuário mobile, quero acessar menu via ícone hambúrguer**
**Contexto**: Em smartphone, preciso acessar categorias sem ocupar espaço
**AC**:
- ✅ Ícone hambúrguer (☰) aparece em mobile
- ✅ Clique abre menu lateral ou dropdown
- ✅ Menu mostra todas as categorias
- ✅ Clique em categoria leva para página da categoria
- ✅ Menu fecha ao clicar em categoria ou fora

### **US3: Como leitor, quero ver data/hora atual no header**
**Contexto**: Quero saber quando as notícias foram publicadas
**AC**:
- ✅ Data aparece no header (Ex: "01 de abril de 2026")
- ✅ Formato em português (pt-BR)
- ✅ Atualiza a cada hora (opcional: a cada minuto)
- ✅ Posicionada à direita do header

### **US4: Como visitante, quero navegação clara por categorias**
**Contexto**: Preciso encontrar notícias de um assunto específico
**AC**:
- ✅ Menu de categorias exibido horizontalmente em desktop
- ✅ Categorias): ÚLTIMAS NOTÍCIAS, CULTURA, ECONOMIA, EDUCAÇÃO, ESPORTES, MEIO AMBIENTE, POLÍTICA, SAÚDE
- ✅ Hover em categoria mostra destaque
- ✅ Link ativo mostra qual categoria estou visualizando

### **US5: Como usuário, quero um header que não atrapalhe a leitura**
**Contexto**: O header não pode ser intrusivo ou ocupar muito espaço
**AC**:
- ✅ Header sticky (fixa) ao scroll (opcional)
- ✅ Altura máxima 120px (mobile) / 150px (desktop)
- ✅ Não bloqueia conteúdo principal
- ✅ Footer é alcançável sem problemas

---

## 📋 Requisitos Funcionais

**FR-001**: Exibir logo/nome da rádio no header
- Nome/logo deve estar sempre visível
- Deve ser clicável (link para home)
- Deve ser responsivo

**FR-002**: Menu hambúrguer em mobile
- Aparecer apenas em breakpoint sm (< 768px)
- Mostrar 3 linhas horizontais (☰)
- Ao clicar, abrir menu lateral

**FR-003**: Menu lateral/dropdown mobile
- Listar todas 8 categorias
- Cada categoria é link
- Menu fecha ao clicar fora (outside click)
- Menu fecha ao clicar em categoria

**FR-004**: Exibir data/hora atual
- Mostrar data no formato "01 de abril de 2026"
- Update automático (a cada hora mínimo)
- Posicionado à direita

**FR-005**: Menu de categorias em desktop
- Exibir 8 categorias em linha horizontal
- Aparecer apenas em md:+ (> 768px)
- Cada categoria é link navegável
- Hover mostra destaque visual

**FR-006**: Responsividade completa
- Mobile (375px): menu hambúrguer + logo + data
- Tablet (768px): começa a mostrar categorias
- Desktop (1024px): layout completo com categorias horizontais

**FR-007**: Acessibilidade do header
- Links semânticos
- ARIA labels no hambúrguer
- Navegação por teclado
- Contraste mínimo 4.5:1

---

## ✅ Critérios de Sucesso

**SC-001**: Header renderiza sem erros em todas páginas
- Home: ✅
- Article detail: ✅
- Futuras páginas: ✅

**SC-002**: Menu funciona em todos navegadores
- Chrome ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

**SC-003**: Navegação por categorias funciona
- Clicar em categoria navega para `/categorias/[slug]`
- URL muda corretamente
- Volta ao estado anterior com botão voltar

**SC-004**: Header não quebra layout
- Não causa CLS (layout shifts)
- Não bloqueia conteúdo abaixo
- Responsive sem horizontal scroll

**SC-005**: Acessibilidade WCAG AA
- Keyboard: Tab navega em links
- Screen reader: Categorias anunciadas
- Contraste: 4.5:1 em textos

**SC-006**: Performance aceitável
- Header carrega em < 100ms
- Menu abre/fecha em < 200ms
- Scroll não causa lag

---

## 🎯 Casos Extremos

**E1: Usuário clica hambúrguer e depois clica outra vez**
- Esperado: Menu abre, clica novamente, menu fecha

**E2: Usuário está em categoria "ECONOMIA" e clica em "ECONOMIA" novamente**
- Esperado: Fica na mesma página (sem reload desnecessário)

**E3: Nome da rádio é muito longo (ex: "Rádio Comunitária Municipal do Vale dos Sinais")**
- Esperado: Logo se adapta, usa fonte menor em mobile se necessário

**E4: Viewport muito estreita (ex: 320px)**
- Esperado: Header ainda funciona, texto não quebra estrangulando

**E5: Menu está aberto e usuário redimensiona a janela de 375px para 800px**
- Esperado: Menu fecha automaticamente (mostra categorias horizontais)

**E6: Data muda à meia-noite**
- Esperado: Data atualiza automaticamente sem refresh

---

## 📝 Assumções

**A1**: Logo da rádio é texto simples ("SuaLogo" ou "PortalNoticias")
- Se usar imagem, precisa ser otimizada (< 50KB)

**A2**: Menu não precisa de animação complexa
- Simples fadeIn/slideIn está ok

**A3**: Não há submenu nas categorias
- Cada categoria é um link direto, sem dropdown

**A4**: Header é igual em todas páginas
- Home, Article, futuras páginas usam mesmo header

**A5**: Não há autenticação no header por enquanto
- Sem botão "Login" ou "Meu Perfil"
- Isso vem na fase de admin/autenticação

---

## ⚙️ Constraints

**C1**: Altura máxima do header
- Mobile: 80-100px (logo + data)
- Desktop: 120-150px (logo + data + categorias)

**C2**: Sem JavaScript pesado
- Usar apenas vanilla JS ou React simples
- Sem jQuery ou libs pesadas

**C3**: Sem ícones externos
- Usar Unicode (☰) ou SVG inline
- Não carregar FontAwesome ou Icon8

**C4**: Mobile-first
- Design começa em mobile
- Desktop é expansão

**C5**: Sem cookies ou storage por enquanto
- Não persistir state do menu
- Menu reseta ao reload

---

## 🎨 Referência Visual

Baseado na imagem fornecida:
```
┌──────────────────────────────────────────────┐
│ ☰  |     SuaLogo      |  01 de abril de 2026 │  ← Header
├──────────────────────────────────────────────┤
│ ÚLTIMAS | CULTURA | DIREITOS HUMANOS | ...   │  ← Categorias (desktop)
├──────────────────────────────────────────────┤
│                                              │
│  [Conteúdo principal - Home]                 │
│                                              │
└──────────────────────────────────────────────┘

MOBILE (< 768px):
┌─────────────────────────┐
│ ☰ | SuaLogo | 01/abr    │
├─────────────────────────┤
│ Menu hambúrguer aberto: │
│ • ÚLTIMAS NOTÍCIAS      │
│ • CULTURA               │
│ • DIREITOS HUMANOS      │
│ • ... (10 mais)         │
└─────────────────────────┘
```

---

## 📊 Summary

| Métrica | Meta |
|---------|------|
| **User Stories** | 5 ✅ |
| **Requisitos Funcionais** | 7 ✅ |
| **Critérios Sucesso** | 6 ✅ |
| **Casos Extremos** | 6 ✅ |
| **Assumções** | 5 ✅ |
| **Constraints** | 5 ✅ |

**Status**: 📋 Especificação Completa
