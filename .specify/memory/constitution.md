<!-- 
SYNC IMPACT REPORT — Constitution v1.0.0 (Initial)
Version: 1.0.0 (NEW)
Ratified: 2026-04-01
Principles: Acessibilidade, Performance, Credibilidade (3, no tests required)
Templates updated: ✅ All referenced
Framework: React + Tailwind
Project scope: Simples e pequeno (no automated tests)
-->

# PortalNoticias Constitution

Uma aplicação web de portal de notícias construída com React e Tailwind CSS. Este projeto prioriza código limpo, acessibilidade, performance e credibilidade, mantendo simplicidade arquitetural.

## Core Principles

### I. Acessibilidade (A11y)
Todo conteúdo DEVE ser acessível a todos os usuários, independentemente de suas capacidades.
- Semântica HTML correta (use `<article>`, `<section>`, `<nav>`, etc. apropriadamente)
- Contraste mínimo WCAG AA (4.5:1 para textos, 3:1 para componentes)
- Navegação por teclado totalmente funcional (Tab, Enter, Esc)
- Labels explícitos em formulários e campos de entrada
- Imagens com `alt` text descritivo ou `aria-label` quando necessário

### II. Performance
O portal DEVE carregar e responder rapidamente para oferecer melhor experiência.
- First Contentful Paint (FCP) < 1.5s em conexão 3G
- Lazy loading de imagens e componentes não-críticos
- CSS e JavaScript otimizados e minificados
- Evitar renderizações desnecessárias (React.memo, useMemo quando apropriado)
- Bundles de código mantidos pequenos e focados

### III. Credibilidade
Cada notícia DEVE ser confiável e rastreável até sua fonte.
- Byline claro com autores e data de publicação
- Links para fontes originais sempre visíveis
- Últimas atualizações/correções documentadas
- Não há gosto editorial (mantém tom neutro e informativo)
- Metadata estruturada (title, description para SEO básico)

## Restrições Técnicas

**Stack Obrigatório:**
- Frontend: React 18+
- Styling: Tailwind CSS
- Sem testes automatizados (este é um projeto pequeno e simples)
- Sem dependências pesadas ou frameworks específicos para features simples

**Arquitetura:**
- Componentes React funcionais e hooks
- Estrutura de pastas: `/components`, `/pages`, `/utils`, `/styles`
- Máximo 2 níveis de aninhamento em estrutura de folders
- Evitar "pasta utils" almoxarifado refatorar features quando crescerem

## Clean Code Guidelines

- **Nomes significativos**: variáveis, funções e componentes devem explicar seu propósito
- **Funções pequenas**: máximo 20 linhas por função (refatore se exceder)
- **DRY (Don't Repeat Yourself)**: extraia lógica reutilizável em utilitários ou hooks
- **Sem código morto**: remova console.logs, imports não usados, comentários desatualizados
- **Comments quando necessário**: explicar *por quê*, não *o quê* (o código já diz o quê)
- **Consistent formatting**: use Prettier com config padrão do projeto

## Governance

Toda mudança DEVE respeitar os três princípios acima. Se uma feature conflitar com Acessibilidade, Performance ou Credibilidade, discuta com o time antes de implementar.

Alterações à constituição requerem consenso de contributors principais e documentação da mudança.

**Version**: 1.0.0 | **Ratified**: 2026-04-01 | **Last Amended**: 2026-04-01
